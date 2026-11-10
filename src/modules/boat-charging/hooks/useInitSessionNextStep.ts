import {useCallback} from 'react'
import {useStore} from '@/hooks/redux/useStore'
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
  type Vignet,
} from '@/modules/boat-charging/types'
import {validateEmail} from '@/utils/validate'

export const useInitSessionNextStep = (step: BoatChargingInitSessionStep) => {
  const store = useStore()
  const form = useNewSessionFormContext()
  const {isLoggedIn} = useIsLoggedIn()
  const {
    data: termsData,
    isLoading: isLoadingTerms,
    isError: isErrorTerms,
  } = useBoatChargingTermsQuery()
  const {
    data: vignettesData,
    isLoading: isLoadingVignettes,
    isError: isErrorVignettes,
  } = useBoatChargingVignettesQuery(undefined, {
    skip: !isLoggedIn,
  })

  const loggedInNextStep = useCallback(
    (
      params: NewSessionFormValues,
      terms: {version: number},
      vignettes: Vignet[] = [],
    ) => {
      const state = store.getState()
      const lastApprovedTermsVersionFromState =
        selectLastApprovedTermsVersionWhileLoggedIn(state)
      const needsTermsApproval =
        lastApprovedTermsVersionFromState === undefined ||
        terms.version > lastApprovedTermsVersionFromState

      const {vignet} = params

      if (!vignet) {
        if (!vignettes?.length) {
          return BoatChargingRouteName.verifyVignet
        } else if (vignettes.length === 1) {
          form.setValue('vignet', vignettes[0])

          return needsTermsApproval
            ? BoatChargingRouteName.termsAndConditions
            : BoatChargingRouteName.confirmSession
        } else {
          return BoatChargingRouteName.chooseVignet
        }
      }

      if (needsTermsApproval) {
        return BoatChargingRouteName.termsAndConditions
      }

      if (step !== BoatChargingRouteName.confirmSession) {
        return BoatChargingRouteName.confirmSession
      }
    },
    [step, store, form],
  )

  const guestNextStep = useCallback(
    (params: NewSessionFormValues) => {
      const {approvedTerms, email, vignet} = params

      if (!email || validateEmail(email) !== true) {
        return BoatChargingRouteName.guestEmail
      }

      if (!vignet) {
        return BoatChargingRouteName.verifyVignet
      }

      if (!approvedTerms) {
        return BoatChargingRouteName.termsAndConditions
      }

      if (step !== BoatChargingRouteName.confirmSession) {
        return BoatChargingRouteName.confirmSession
      }
    },
    [step],
  )

  const getNextStep = useCallback(
    (params: NewSessionFormValues) => {
      if (!termsData) {
        return step
      }

      return isLoggedIn
        ? loggedInNextStep(params, termsData, vignettesData)
        : guestNextStep(params)
    },
    [
      guestNextStep,
      loggedInNextStep,
      isLoggedIn,
      vignettesData,
      termsData,
      step,
    ],
  )

  return {
    getNextStep,
    isLoading: isLoadingTerms || isLoadingVignettes,
    isError: isErrorTerms || isErrorVignettes,
  }
}
