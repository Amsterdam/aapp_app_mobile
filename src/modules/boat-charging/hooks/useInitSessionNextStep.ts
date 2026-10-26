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
  const {data: terms} = useBoatChargingTermsQuery()
  const {isLoggedIn} = useIsLoggedIn()
  const {data: vignettes} = useBoatChargingVignettesQuery(undefined, {
    skip: !isLoggedIn,
  })

  const loggedInNextStep = useCallback(() => {
    const state = store.getState()
    const lastApprovedTermsVersionFromState =
      selectLastApprovedTermsVersionWhileLoggedIn(state)

    if (
      step === BoatChargingInitSessionStep.selectSocket ||
      step === BoatChargingInitSessionStep.guestEmail
    ) {
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
  }, [step, store, terms?.version, vignettes])

  const guestNextStep = useCallback(
    (params: NewSessionFormValues) => {
      const {approvedTerms, email} = params

      if (
        !email ||
        validateEmail(email) !== true ||
        step === BoatChargingInitSessionStep.selectSocket
      ) {
        return BoatChargingRouteName.guestEmail
      }

      if (step === BoatChargingInitSessionStep.guestEmail) {
        return BoatChargingRouteName.verifyVignet
      }

      if (!approvedTerms || step === BoatChargingInitSessionStep.verifyVignet) {
        return BoatChargingRouteName.termsAndConditions
      }

      if (step !== BoatChargingInitSessionStep.confirmSession) {
        return BoatChargingRouteName.confirmSession
      }
    },
    [step],
  )

  return useCallback(
    (params: NewSessionFormValues) =>
      isLoggedIn ? loggedInNextStep() : guestNextStep(params),
    [guestNextStep, loggedInNextStep, isLoggedIn],
  )
}
