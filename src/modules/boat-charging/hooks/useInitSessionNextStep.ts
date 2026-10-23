import {useCallback} from 'react'
import {useStore} from '@/hooks/redux/useStore'
import {BoatChargingInitSessionStep} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {selectLastApprovedTermsVersionWhileLoggedIn} from '@/modules/boat-charging/slice'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {validateEmail} from '@/utils/validate'

export const useInitSessionNextStep = (step: BoatChargingInitSessionStep) => {
  const store = useStore()
  const {isLoggedIn} = useIsLoggedIn()
  const {
    data: terms,
    isLoading: isLoadingTerms,
    isError: isErrorTerms,
  } = useBoatChargingTermsQuery()
  const {
    data: vignettes,
    isLoading: isLoadingVignettes,
    isError: isErrorVignettes,
  } = useBoatChargingVignettesQuery(undefined, {
    skip: !isLoggedIn,
  })

  const loggedInNextStep = useCallback(
    (params: NewSessionFormValues) => {
      const state = store.getState()
      const lastApprovedTermsVersionFromState =
        selectLastApprovedTermsVersionWhileLoggedIn(state)

      const {vignet} = params

      if (!vignet) {
        if (vignettes?.length) {
          return BoatChargingRouteName.chooseVignet
        } else {
          return BoatChargingRouteName.verifyVignet
        }
      }

      if (terms?.version !== lastApprovedTermsVersionFromState) {
        return BoatChargingRouteName.termsAndConditions
      }

      if (step !== BoatChargingInitSessionStep.confirmSession) {
        return BoatChargingRouteName.confirmSession
      }
    },
    [step, store, terms?.version, vignettes],
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

      if (step !== BoatChargingInitSessionStep.confirmSession) {
        return BoatChargingRouteName.confirmSession
      }
    },
    [step],
  )

  const getNextStep = useCallback(
    (params: NewSessionFormValues) =>
      isLoggedIn ? loggedInNextStep(params) : guestNextStep(params),
    [guestNextStep, loggedInNextStep, isLoggedIn],
  )

  return {
    getNextStep,
    isLoading: isLoadingTerms || isLoadingVignettes,
    isError: isErrorTerms || isErrorVignettes,
  }
}
