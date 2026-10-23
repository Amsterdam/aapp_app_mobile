import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {alerts} from '@/modules/boat-charging/alerts'
import {vignetInvalidReasonToAlertMap} from '@/modules/boat-charging/constants/vignetInvalidReasonToAlertMap'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useBoatChargingVerifyVignetMutation} from '@/modules/boat-charging/service'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

export const BoatChargingConfirmSessionSubmitButton = () => {
  const {setAlert} = useAlert()

  const {form, onPress, isLoading, isError} = useInitSession(
    BoatChargingInitSessionStep.confirmSession,
  )

  const [
    verifyVignet,
    {isLoading: isLoadingVerifyVignet, isError: isErrorVerifyVignet},
  ] = useBoatChargingVerifyVignetMutation()

  const onSubmit = useCallback(
    async ({vignet, isVignetVerified, ...values}: NewSessionFormValues) => {
      if (!vignet) {
        return
      }

      if (!isVignetVerified) {
        try {
          const {status, reason} = await verifyVignet(vignet).unwrap()

          if (status === 'invalid') {
            setAlert(alerts[vignetInvalidReasonToAlertMap[reason]])

            return
          }

          form.setValue('isVignetVerified', true)
        } catch (error) {
          devError(error)

          setAlert(alerts.vignetVerificationErrorFailed)

          return
        }
      }

      return onPress({...values, isVignetVerified: true, vignet})
    },
    [verifyVignet, onPress, setAlert, form],
  )

  return (
    <Button
      icon={{
        name: 'lightning',
        color: 'inverse',
        size: 'ml',
        isFilled: true,
      }}
      isError={isError || isErrorVerifyVignet}
      isLoading={isLoading || isLoadingVerifyVignet}
      label="Betalen en laden"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingTermsAndConditionsScreenSubmitButton"
    />
  )
}
