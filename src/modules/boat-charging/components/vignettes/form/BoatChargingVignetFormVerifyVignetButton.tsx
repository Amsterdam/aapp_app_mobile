import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {alerts} from '@/modules/boat-charging/alerts'
import {vignetInvalidReasonToAlertMap} from '@/modules/boat-charging/constants/vignetInvalidReasonToAlertMap'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {type BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {
  useBoatChargingAddVignetMutation,
  useBoatChargingVerifyVignetMutation,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {type Vignet, VignetInvalidReasons} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onVerified: (vignet: Omit<Vignet, 'id'>) => void
}

export const BoatChargingVignetFormVerifyVignetButton = ({
  onVerified,
}: Props) => {
  const {isLoggedIn} = useIsLoggedIn()

  const [addVignet, {isLoading: isLoadingAddVignet}] =
    useBoatChargingAddVignetMutation()
  const [
    verifyVignet,
    {isLoading: isLoadingVerifyVignet, isError: isErrorVerifyVignet},
  ] = useBoatChargingVerifyVignetMutation()

  const {data: myVignettes, isLoading: isLoadingMyVignettes} =
    useBoatChargingVignettesQuery(isLoggedIn ? undefined : skipToken)

  const {setAlert} = useAlert()
  const {handleSubmit, setError} =
    useFormContext<BoatChargingVignetFormValues>()

  const onVerifyVignet = useCallback(
    ({
      postalCode,
      vignetNumber,
      saveToMyVignettes,
    }: BoatChargingVignetFormValues) => {
      const vignet = {
        postal_code: postalCode,
        vignette_number: vignetNumber,
      }

      void verifyVignet(vignet)
        .unwrap()
        .then(
          ({status, reason, expiration_date}) => {
            if (status === 'invalid') {
              if (reason === VignetInvalidReasons.mismatch) {
                setError('postalCode', {
                  message: 'Vignetnummer en postcode komen niet overeen.',
                })

                return
              }

              const alertKey = vignetInvalidReasonToAlertMap[reason]

              setAlert(alerts[alertKey])

              return
            }

            const alreadySaved = myVignettes?.some(
              myVignet => myVignet.vignette_number === vignetNumber,
            )

            if (saveToMyVignettes && !alreadySaved) {
              void addVignet(vignet).unwrap().catch(devError) // This call should not block the flow and only fail silently
            }

            onVerified({...vignet, expiration_date})
          },
          error => {
            devError(error)

            setAlert(alerts.vignetVerificationErrorFailed)
          },
        )
    },

    [addVignet, verifyVignet, setAlert, onVerified, setError, myVignettes],
  )

  return (
    <Button
      isError={isErrorVerifyVignet}
      isLoading={
        isLoadingVerifyVignet || isLoadingAddVignet || isLoadingMyVignettes
      }
      label="Controleer vignet"
      onPress={handleSubmit(onVerifyVignet)}
      testID="BoatChargingVignetFormVerifyButton"
    />
  )
}
