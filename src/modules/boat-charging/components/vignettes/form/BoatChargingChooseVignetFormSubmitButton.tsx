import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'

export const BoatChargingChooseVignetFormSubmitButton = () => {
  const {onPress, form} = useInitSession(BoatChargingRouteName.chooseVignet)

  const onSubmit = useCallback(
    ({vignet, ...values}: NewSessionFormValues) => {
      form.clearErrors('vignet')

      if (!vignet) {
        return form.setError('vignet', {
          message: 'Kies een vignet om verder te gaan.',
        })
      }

      void onPress({...values, vignet})
    },
    [form, onPress],
  )

  return (
    <Button
      label="Kies vignet"
      onPress={() => onSubmit(form.getValues())}
      testID="BoatChargingChooseVignetSubmitButton"
    />
  )
}
