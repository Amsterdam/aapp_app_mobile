import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {alerts} from '@/modules/boat-charging/alerts'
import {vignetteInvalidReasonToAlertMap} from '@/modules/boat-charging/constants/vignetteInvalidReasonToAlertMap'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {type BoatChargingVignetteFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetteForm.provider'
import {
  useBoatChargingAddVignetteMutation,
  useBoatChargingVerifyVignetteMutation,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {
  type BaseVignette,
  VignetteInvalidReasons,
} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onVerified: (vignette: BaseVignette) => void
}

export const BoatChargingVignetteFormVerifyVignetteButton = ({
  onVerified,
}: Props) => {
  const {isLoggedIn} = useIsLoggedIn()

  const [addVignette, {isLoading: isLoadingAddVignette}] =
    useBoatChargingAddVignetteMutation()
  const [
    verifyVignette,
    {isLoading: isLoadingVerifyVignette, isError: isErrorVerifyVignette},
  ] = useBoatChargingVerifyVignetteMutation()

  const {data: myVignettes, isLoading: isLoadingMyVignettes} =
    useBoatChargingVignettesQuery(isLoggedIn ? undefined : skipToken)

  const {setAlert} = useAlert()
  const {handleSubmit, setError} =
    useFormContext<BoatChargingVignetteFormValues>()

  const onVerifyVignette = useCallback(
    ({
      postalCode,
      vignetteNumber,
      saveToMyVignettes,
    }: BoatChargingVignetteFormValues) => {
      const vignette = {
        postal_code: postalCode,
        vignette_number: vignetteNumber,
      }

      void verifyVignette(vignette)
        .unwrap()
        .then(
          ({status, reason}) => {
            if (status === 'invalid') {
              if (reason === VignetteInvalidReasons.mismatch) {
                setError('postalCode', {
                  message: 'Vignetnummer en postcode komen niet overeen.',
                })

                return
              }

              const alertKey = vignetteInvalidReasonToAlertMap[reason]

              setAlert(alerts[alertKey])

              return
            }

            const alreadySaved = myVignettes?.some(
              myVignette => myVignette.vignette_number === vignetteNumber,
            )

            if (saveToMyVignettes && !alreadySaved) {
              void addVignette(vignette).unwrap().catch(devError) // This call should not block the flow and only fail silently
            }

            onVerified(vignette)
          },
          error => {
            devError(error)

            setAlert(alerts.vignetteVerificationErrorFailed)
          },
        )
    },

    [addVignette, verifyVignette, setAlert, onVerified, setError, myVignettes],
  )

  return (
    <Button
      isError={isErrorVerifyVignette}
      isLoading={
        isLoadingVerifyVignette || isLoadingAddVignette || isLoadingMyVignettes
      }
      label="Controleer vignet"
      onPress={handleSubmit(onVerifyVignette)}
      testID="BoatChargingVignetteFormVerifyButton"
    />
  )
}
