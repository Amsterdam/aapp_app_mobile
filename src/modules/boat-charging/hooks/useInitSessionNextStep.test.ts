import {renderHook} from '@testing-library/react-native'
import {useStore} from '@/hooks/redux/useStore'
import {BoatChargingInitSessionStep} from '@/modules/boat-charging/hooks/useInitSession'
import {useInitSessionNextStep} from '@/modules/boat-charging/hooks/useInitSessionNextStep'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {selectLastApprovedTermsVersionWhileLoggedIn} from '@/modules/boat-charging/slice'
import type {NewSessionFormValues, Vignet} from '@/modules/boat-charging/types'

jest.mock('@/hooks/redux/useStore', () => ({
  useStore: jest.fn(),
}))

jest.mock('@/modules/boat-charging/hooks/useIsLoggedIn', () => ({
  useIsLoggedIn: jest.fn(),
}))

jest.mock('@/modules/boat-charging/service', () => ({
  useBoatChargingTermsQuery: jest.fn(),
  useBoatChargingVignettesQuery: jest.fn(),
}))

jest.mock('@/modules/boat-charging/slice', () => ({
  selectLastApprovedTermsVersionWhileLoggedIn: jest.fn(),
}))

const useStoreMock = jest.mocked(useStore)
const useIsLoggedInMock = jest.mocked(useIsLoggedIn)
const useBoatChargingTermsQueryMock = jest.mocked(useBoatChargingTermsQuery)
const useBoatChargingVignettesQueryMock = jest.mocked(
  useBoatChargingVignettesQuery,
)

const selectLastApprovedTermsVersionMock = jest.mocked(
  selectLastApprovedTermsVersionWhileLoggedIn,
)

const params: NewSessionFormValues = {
  approvedTerms: true,
  email: 'test@example.com',
}

describe('useInitSessionNextStep/loggedIn', () => {
  let terms: {version: number} | null | undefined
  let lastApprovedTermsVersion: number | null | undefined
  let vignettes: Array<Vignet> | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    terms = {version: 1}
    lastApprovedTermsVersion = 1
    vignettes = []

    useStoreMock.mockReturnValue({getState: jest.fn()} as never)
    useIsLoggedInMock.mockImplementation(() => ({isLoggedIn: true}) as never)
    useBoatChargingTermsQueryMock.mockImplementation(
      () => ({data: terms}) as never,
    )
    useBoatChargingVignettesQueryMock.mockImplementation(
      () => ({data: vignettes}) as never,
    )
    selectLastApprovedTermsVersionMock.mockImplementation(
      () => lastApprovedTermsVersion as never,
    )
  })

  it.each([null, undefined])(
    'ignores email form param for logged in users',
    email => {
      const {result} = renderHook(() =>
        useInitSessionNextStep(BoatChargingInitSessionStep.selectSocket),
      )

      const getNextStep = result.current

      expect(getNextStep({email: email as never})).toBe(
        BoatChargingRouteName.verifyVignet,
      )
    },
  )

  it.each([
    BoatChargingInitSessionStep.selectSocket,
    BoatChargingInitSessionStep.guestEmail,
  ])('routes logged-in users at step %s to vignette verification', step => {
    const {result} = renderHook(() => useInitSessionNextStep(step))

    expect(result.current(params)).toBe(BoatChargingRouteName.verifyVignet)
  })

  it.each([
    BoatChargingInitSessionStep.selectSocket,
    BoatChargingInitSessionStep.guestEmail,
  ])(
    'routes logged-in users at step %s to vignette selection, when they have vignettes connected to their account',
    step => {
      vignettes = [
        {
          vignette_number: 'AM123456',
          postal_code: '1234AB',
          id: 1,
          expiration_date: new Date().toISOString(),
        },
      ]
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current(params)).toBe(BoatChargingRouteName.chooseVignet)
    },
  )

  it.each([
    BoatChargingInitSessionStep.verifyVignet,
    BoatChargingInitSessionStep.chooseVignet,
  ])('routes logged-in users at step %s to session confirmation', step => {
    const {result} = renderHook(() => useInitSessionNextStep(step))

    expect(result.current(params)).toBe(BoatChargingRouteName.confirmSession)
  })

  it('routes logged-in users to terms when their approved version is outdated', () => {
    lastApprovedTermsVersion = 0
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.confirmSession),
    )

    expect(result.current(params)).toBe(
      BoatChargingRouteName.termsAndConditions,
    )
  })

  it('routes logged-in users with current terms to session confirmation', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.termsAndConditions),
    )

    expect(result.current(params)).toBe(BoatChargingRouteName.confirmSession)
  })

  it('does not route logged-in users already at confirmation when terms match', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.confirmSession),
    )

    expect(result.current(params)).toBeUndefined()
  })

  it('treats matching absent terms versions as current', () => {
    terms = undefined
    lastApprovedTermsVersion = undefined
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.termsAndConditions),
    )

    expect(result.current(params)).toBe(BoatChargingRouteName.confirmSession)
  })
})

describe('useInitSessionNextStep/guest', () => {
  let terms: {version: number} | null | undefined
  let lastApprovedTermsVersion: number | null | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    terms = {version: 1}
    lastApprovedTermsVersion = 1

    useStoreMock.mockReturnValue({getState: jest.fn()} as never)
    useIsLoggedInMock.mockImplementation(() => ({isLoggedIn: false}) as never)
    useBoatChargingTermsQueryMock.mockImplementation(
      () => ({data: terms}) as never,
    )
    useBoatChargingVignettesQueryMock.mockImplementation(
      () => ({data: undefined}) as never,
    )
    selectLastApprovedTermsVersionMock.mockImplementation(
      () => lastApprovedTermsVersion as never,
    )
  })

  it.each([null, undefined])(
    'routes guests to email when email is %p',
    email => {
      const {result} = renderHook(() =>
        useInitSessionNextStep(BoatChargingInitSessionStep.guestEmail),
      )

      const getNextStep = result.current

      expect(getNextStep({email: email as never})).toBe(
        BoatChargingRouteName.guestEmail,
      )
    },
  )

  it('routes guests with an empty or invalid email to email entry', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.verifyVignet),
    )

    expect(result.current({...params, email: ''})).toBe(
      BoatChargingRouteName.guestEmail,
    )
    expect(result.current({...params, email: 'invalid-email'})).toBe(
      BoatChargingRouteName.guestEmail,
    )
  })

  it('routes guests from socket selection to email entry, even with valid form values.', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.selectSocket),
    )

    expect(result.current(params)).toBe(BoatChargingRouteName.guestEmail)
  })

  it('routes guests from email entry to vignette verification, regardless of approvedTerms value', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.guestEmail),
    )

    expect(result.current(params)).toBe(BoatChargingRouteName.verifyVignet)
    expect(result.current({...params, approvedTerms: undefined})).toBe(
      BoatChargingRouteName.verifyVignet,
    )
    expect(result.current({...params, approvedTerms: null} as never)).toBe(
      BoatChargingRouteName.verifyVignet,
    )
  })

  it('routes guests from vignette verification to terms', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.verifyVignet),
    )

    expect(result.current(params)).toBe(
      BoatChargingRouteName.termsAndConditions,
    )
  })

  it.each([null, undefined, false])(
    'requires guest terms approval when approvedTerms is %p',
    approvedTerms => {
      const {result} = renderHook(() =>
        useInitSessionNextStep(BoatChargingInitSessionStep.termsAndConditions),
      )

      expect(
        result.current({
          ...params,
          approvedTerms: approvedTerms as never,
        }),
      ).toBe(BoatChargingRouteName.termsAndConditions)
    },
  )

  it('routes a guest with approved terms to session confirmation', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.termsAndConditions),
    )

    expect(result.current(params)).toBe(BoatChargingRouteName.confirmSession)
  })

  it('returns no next route for a guest already at session confirmation', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingInitSessionStep.confirmSession),
    )

    expect(result.current(params)).toBeUndefined()
  })
})
