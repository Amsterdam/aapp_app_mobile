import {renderHook} from '@testing-library/react-native'
import {useStore} from '@/hooks/redux/useStore'
import {useInitSessionNextStep} from '@/modules/boat-charging/hooks/useInitSessionNextStep'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {selectLastApprovedTermsVersionWhileLoggedIn} from '@/modules/boat-charging/slice'
import {
  type BoatChargingInitSessionStep,
  type NewSessionFormValues,
  type Vignette,
} from '@/modules/boat-charging/types'

jest.mock('@/modules/boat-charging/hooks/useNewSessionForm', () => ({
  useNewSessionFormContext: jest.fn(),
}))

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
const useNewSessionFormContextMock = jest.mocked(useNewSessionFormContext)
const setValueMock = jest.fn()
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

const vignette: Vignette = {
  vignette_number: 'AM123456',
  postal_code: '1234AB',
  id: 1,
  expiration_date: new Date().toISOString(),
}

describe('useInitSessionNextStep/loggedIn', () => {
  let terms: {version: number} | null | undefined
  let lastApprovedTermsVersion: number | null | undefined
  let vignettes: Array<Vignette> | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    terms = {version: 1}
    lastApprovedTermsVersion = 1
    vignettes = []

    useNewSessionFormContextMock.mockReturnValue({
      setValue: setValueMock,
    } as never)
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
        useInitSessionNextStep(BoatChargingRouteName.locationDetails),
      )

      const {getNextStep} = result.current

      expect(getNextStep({email: email as never})).toBe(
        BoatChargingRouteName.verifyVignette,
      )
    },
  )

  it.each(
    Array.from<BoatChargingInitSessionStep>([
      BoatChargingRouteName.locationDetails,
      BoatChargingRouteName.guestEmail,
      BoatChargingRouteName.termsAndConditions,
      BoatChargingRouteName.confirmSession,
      BoatChargingRouteName.chooseVignette,
    ]),
  )(
    'routes logged-in users at step %s to vignette verification when no vignette has been selected',
    step => {
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current.getNextStep(params)).toBe(
        BoatChargingRouteName.verifyVignette,
      )
    },
  )

  it.each(
    Array.from<BoatChargingInitSessionStep>([
      BoatChargingRouteName.locationDetails,
      BoatChargingRouteName.guestEmail,
      BoatChargingRouteName.termsAndConditions,
      BoatChargingRouteName.confirmSession,
      BoatChargingRouteName.verifyVignette,
    ]),
  )(
    'routes logged-in users at step %s to vignette selection, when they have 2 or more vignettes connected to their account',
    step => {
      vignettes = [
        vignette,
        {
          vignette_number: 'MA123456',
          postal_code: '1234AB',
          id: 2,
          expiration_date: new Date().toISOString(),
        },
      ]
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current.getNextStep(params)).toBe(
        BoatChargingRouteName.chooseVignette,
      )
    },
  )

  it.each(
    Array.from<BoatChargingInitSessionStep>([
      BoatChargingRouteName.locationDetails,
      BoatChargingRouteName.guestEmail,
      BoatChargingRouteName.termsAndConditions,
      BoatChargingRouteName.confirmSession,
      BoatChargingRouteName.verifyVignette,
    ]),
  )(
    'routes logged-in users at step %s to confirm session, when they have only 1 vignette connected to their account and all other params are set.',
    step => {
      vignettes = [vignette]
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current.getNextStep(params)).toBe(
        BoatChargingRouteName.confirmSession,
      )
      expect(setValueMock).toHaveBeenCalledTimes(1)
      expect(setValueMock).toHaveBeenCalledWith('vignette', vignette)
    },
  )

  it('routes to terms before confirmation when auto-selecting the only vignette and no terms version is approved', () => {
    vignettes = [vignette]
    lastApprovedTermsVersion = undefined
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.locationDetails),
    )

    expect(result.current.getNextStep(params)).toBe(
      BoatChargingRouteName.termsAndConditions,
    )
    expect(setValueMock).toHaveBeenCalledWith('vignette', vignette)
  })

  it.each(
    Array.from<BoatChargingInitSessionStep>([
      BoatChargingRouteName.locationDetails,
      BoatChargingRouteName.guestEmail,
      BoatChargingRouteName.termsAndConditions,
      BoatChargingRouteName.confirmSession,
      BoatChargingRouteName.verifyVignette,
    ]),
  )(
    'routes logged-in users at step %s to session confirmation, when all required params are set',
    step => {
      vignettes = [vignette]
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current.getNextStep(params)).toBe(
        BoatChargingRouteName.confirmSession,
      )
    },
  )

  it('routes logged-in users to terms when their approved version is outdated', () => {
    lastApprovedTermsVersion = 0
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.confirmSession),
    )

    expect(result.current.getNextStep({...params, vignette})).toBe(
      BoatChargingRouteName.termsAndConditions,
    )
  })

  it('routes logged-in users with current terms to session confirmation', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.termsAndConditions),
    )

    expect(result.current.getNextStep({...params, vignette})).toBe(
      BoatChargingRouteName.confirmSession,
    )
  })

  it('does not route logged-in users already at confirmation when terms match', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.confirmSession),
    )

    expect(result.current.getNextStep({...params, vignette})).toBeUndefined()
  })

  it.each(
    Array.from<BoatChargingInitSessionStep>([
      BoatChargingRouteName.locationDetails,
      BoatChargingRouteName.guestEmail,
      BoatChargingRouteName.termsAndConditions,
      BoatChargingRouteName.verifyVignette,
      BoatChargingRouteName.chooseVignette,
    ]),
  )(
    'treats matching absent terms versions as invalid and returns current route',
    step => {
      terms = undefined
      lastApprovedTermsVersion = undefined
      const {result} = renderHook(() => useInitSessionNextStep(step))

      expect(result.current.getNextStep({...params, vignette})).toBe(step)
    },
  )

  it('Navigated to terms and conditions when no approved terms version has been stored', () => {
    terms = {version: 1}
    lastApprovedTermsVersion = undefined
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.locationDetails),
    )

    expect(result.current.getNextStep({...params, vignette})).toBe(
      BoatChargingRouteName.termsAndConditions,
    )
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
        useInitSessionNextStep(BoatChargingRouteName.guestEmail),
      )

      const {getNextStep} = result.current

      expect(getNextStep({email: email as never})).toBe(
        BoatChargingRouteName.guestEmail,
      )
    },
  )

  it('routes guests with an empty or invalid email to email entry', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.verifyVignette),
    )

    expect(result.current.getNextStep({...params, email: ''})).toBe(
      BoatChargingRouteName.guestEmail,
    )
    expect(
      result.current.getNextStep({...params, email: 'invalid-email'}),
    ).toBe(BoatChargingRouteName.guestEmail)
  })

  it('routes guests from socket selection to confirm session, when all required form values are set.', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.locationDetails),
    )

    expect(result.current.getNextStep({...params, vignette})).toBe(
      BoatChargingRouteName.confirmSession,
    )
  })

  it('routes guests from email entry to vignette verification, regardless of approvedTerms value', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.guestEmail),
    )

    expect(result.current.getNextStep(params)).toBe(
      BoatChargingRouteName.verifyVignette,
    )
    expect(
      result.current.getNextStep({...params, approvedTerms: undefined}),
    ).toBe(BoatChargingRouteName.verifyVignette)
    expect(
      result.current.getNextStep({...params, approvedTerms: null as never}),
    ).toBe(BoatChargingRouteName.verifyVignette)
  })

  it('routes guests from vignette verification to terms when not yet approved', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.verifyVignette),
    )

    expect(
      result.current.getNextStep({...params, approvedTerms: false, vignette}),
    ).toBe(BoatChargingRouteName.termsAndConditions)
  })

  it.each([null, undefined, false])(
    'requires guest terms approval when approvedTerms is %p',
    approvedTerms => {
      const {result} = renderHook(() =>
        useInitSessionNextStep(BoatChargingRouteName.termsAndConditions),
      )

      expect(
        result.current.getNextStep({
          ...params,
          vignette,
          approvedTerms: approvedTerms as never,
        }),
      ).toBe(BoatChargingRouteName.termsAndConditions)
    },
  )

  it('routes a guest with approved terms to session confirmation when all other required form values are set', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.termsAndConditions),
    )

    expect(result.current.getNextStep({...params, vignette})).toBe(
      BoatChargingRouteName.confirmSession,
    )
  })

  it('returns no next route for a guest already at session confirmation when all required form values are set', () => {
    const {result} = renderHook(() =>
      useInitSessionNextStep(BoatChargingRouteName.confirmSession),
    )

    expect(result.current.getNextStep({...params, vignette})).toBeUndefined()
  })
})
