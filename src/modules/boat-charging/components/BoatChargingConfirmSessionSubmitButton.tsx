import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {alerts} from '@/modules/boat-charging/alerts'
import {vignetteInvalidReasonToAlertMap} from '@/modules/boat-charging/constants/vignetteInvalidReasonToAlertMap'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingVerifyVignetteMutation} from '@/modules/boat-charging/service'
import {type NewSessionFormValues} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

export const BoatChargingConfirmSessionSubmitButton = () => {
  const {setAlert} = useAlert()

  const {form, onPress, isLoading, isError} = useInitSession(
    BoatChargingRouteName.confirmSession,
  )

  const [
    verifyVignette,
    {isLoading: isLoadingVerifyVignette, isError: isErrorVerifyVignette},
  ] = useBoatChargingVerifyVignetteMutation()

  const onSubmit = useCallback(
    async ({vignette, ...values}: NewSessionFormValues) => {
      if (!vignette) {
        return
      }

      if (!vignette.verified) {
        try {
          const {status, reason} = await verifyVignette(vignette).unwrap()

          if (status === 'invalid') {
            setAlert(alerts[vignetteInvalidReasonToAlertMap[reason]])

            return
          }

          form.setValue('vignette.verified', true)
        } catch (error) {
          devError(error)

          setAlert(alerts.vignetteVerificationErrorFailed)

          return
        }
      }

      return onPress({...values, vignette})
    },
    [onPress, setAlert, form, verifyVignette],
  )

  return (
    <Button
      icon={{
        name: 'lightning',
        color: 'inverse',
        size: 'ml',
        isFilled: true,
      }}
      isError={isError || isErrorVerifyVignette}
      isLoading={
        isLoading || isLoadingVerifyVignette || form.formState.isSubmitting
      }
      label="Betalen en laden"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingConfirmSessionSubmitButton"
    />
  )
}
