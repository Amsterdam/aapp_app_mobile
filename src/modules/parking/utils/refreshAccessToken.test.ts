import {configureStore} from '@reduxjs/toolkit'
import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query'
import {alerts} from '@/modules/parking/alerts'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {afterError} from '@/modules/parking/utils/afterError'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'
import {logout} from '@/modules/parking/utils/logout'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {type RootState} from '@/store/types/rootState'

jest.mock('@/modules/parking/service', () => ({
  parkingApi: {
    endpoints: {
      login: {initiate: jest.fn(() => () => ({unwrap: mockUnwrap}))},
    },
  },
}))
jest.mock('@/modules/parking/slice', () => ({
  parkingSlice: {
    actions: {
      setAccessToken: jest.fn((payload: unknown) => ({
        type: 'parking/setAccessToken',
        payload,
      })),
    },
  },
  selectParkingAccount: jest.fn(),
}))
jest.mock('@/modules/parking/utils/getSecureParkingAccount')
jest.mock('@/modules/parking/utils/logout')
jest.mock('@/processes/development', () => ({
  devLog: jest.fn(),
  devError: jest.fn(),
}))

const state = {} as RootState
const loginResponse = {
  access_token: 'refreshed-token',
  access_token_expiration: '2026-12-01T12:00:00Z',
}
const mockUnwrap = jest.fn()
const {dispatch} = configureStore({reducer: () => state})

type TestBaseQuery = BaseQueryFn<object, unknown, FetchBaseQueryError>
const baseQueryApi: BaseQueryApi = {
  abort: jest.fn(),
  dispatch,
  endpoint: 'protectedParkingRequest',
  extra: undefined,
  getState: () => state,
  signal: new AbortController().signal,
  type: 'query',
}
const refresh = (
  reportCode = 'ACCOUNT',
  scope = ParkingPermitScope.permitHolder,
) => refreshAccessToken(reportCode, scope, dispatch, state)

describe('parking token renewal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest
      .mocked(getSecureParkingAccount)
      .mockImplementation(reportCode =>
        Promise.resolve({reportCode, pin: '1234'}),
      )
    mockUnwrap.mockResolvedValue(loginResponse)
  })

  it('shares concurrent renewals and saves the renewed token once', async () => {
    const tokens = await Promise.all(Array.from({length: 15}, () => refresh()))

    expect(tokens).toEqual(Array.from({length: 15}, () => 'refreshed-token'))
    expect(getSecureParkingAccount).toHaveBeenCalledTimes(1)
    expect(parkingApi.endpoints.login.initiate).toHaveBeenCalledTimes(1)
    expect(parkingSlice.actions.setAccessToken).toHaveBeenCalledWith({
      accessToken: 'refreshed-token',
      accessTokenExpiration: loginResponse.access_token_expiration,
      reportCode: 'ACCOUNT',
    })
    expect(parkingSlice.actions.setAccessToken).toHaveBeenCalledTimes(1)
  })

  it('keeps different accounts and account types independent', async () => {
    await Promise.all([
      refresh('FIRST'),
      refresh('SECOND'),
      refresh('FIRST', ParkingPermitScope.visitor),
    ])

    expect(parkingApi.endpoints.login.initiate).toHaveBeenCalledTimes(3)
  })

  it.each([502, 503])(
    'limits concurrent protected requests to one three-attempt renewal after %s',
    async status => {
      const loginAttempt = jest.fn(() =>
        Promise.resolve({error: {status, data: 'Service unavailable'}}),
      )
      const retryingLogin = retry<TestBaseQuery>(loginAttempt, {
        maxRetries: 2,
        backoff: () => Promise.resolve(),
      })

      mockUnwrap.mockImplementation(async () => {
        const result = await retryingLogin({}, baseQueryApi, {})

        throw result.error
      })

      const protectedAttempt = jest.fn(async () => ({data: await refresh()}))
      const protectedRequest = retry<TestBaseQuery>(protectedAttempt, {
        maxRetries: 2,
        backoff: () => Promise.resolve(),
      })
      const results = await Promise.all(
        Array.from({length: 15}, async () =>
          protectedRequest({}, baseQueryApi, {}),
        ),
      )

      expect(loginAttempt).toHaveBeenCalledTimes(3)
      expect(protectedAttempt).toHaveBeenCalledTimes(15)
      expect(results).toEqual(
        Array.from({length: 15}, () => ({
          error: {status: 'CUSTOM_ERROR', error: 'Token refresh failed'},
          meta: undefined,
        })),
      )
      expect(logout).not.toHaveBeenCalled()

      mockUnwrap.mockResolvedValue(loginResponse)

      await expect(protectedRequest({}, baseQueryApi, {})).resolves.toEqual({
        data: 'refreshed-token',
      })
      expect(parkingApi.endpoints.login.initiate).toHaveBeenCalledTimes(2)
    },
  )

  it.each([
    ['SSP_BAD_CREDENTIALS', undefined],
    ['SSP_ACCOUNT_INACTIVE', alerts.loginAccountInactiveFailed],
    ['SSP_ACCOUNT_BLOCKED', alerts.loginAccountBlockedFailed],
  ])('preserves logout for %s', async (code, alert) => {
    mockUnwrap.mockRejectedValue({status: 401, data: {code}})
    const request = retry<TestBaseQuery>(
      async () => ({data: await refresh()}),
      {
        maxRetries: 2,
        backoff: () => Promise.resolve(),
      },
    )

    await request({}, baseQueryApi, {})

    if (alert) {
      expect(logout).toHaveBeenCalledWith(dispatch, state, alert)
    } else {
      expect(logout).toHaveBeenCalledWith(dispatch, state)
    }

    expect(parkingApi.endpoints.login.initiate).toHaveBeenCalledTimes(1)
  })

  it('does not start another renewal from the final error callback', async () => {
    await afterError(
      {error: {status: 403, data: 'Forbidden'}},
      baseQueryApi,
      jest.fn(),
      true,
    )

    expect(parkingApi.endpoints.login.initiate).not.toHaveBeenCalled()
    expect(getSecureParkingAccount).not.toHaveBeenCalled()
  })
})
