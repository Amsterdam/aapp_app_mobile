import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'

export const BoatChargingChooseVignetteFormSubmitButton = () => {
  const {onPress, form} = useInitSession(BoatChargingRouteName.chooseVignette)

  const onSubmit = useCallback(
    ({vignette, ...values}: NewSessionFormValues) => {
      form.clearErrors('vignette')

      if (!vignette) {
        return form.setError('vignette', {
          message: 'Kies een vignet om verder te gaan.',
        })
      }

      void onPress({...values, vignette})
    },
    [form, onPress],
  )

  return (
    <Button
      label="Kies vignet"
      onPress={() => onSubmit(form.getValues())}
      testID="BoatChargingChooseVignetteSubmitButton"
    />
  )
}
