import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {
  useInitSession,
  BoatChargingInitSessionStep,
} from '@/modules/boat-charging/hooks/useInitSession'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'

export const BoatChargingChooseVignetFormSubmitButton = () => {
  const {onPress, form} = useInitSession(
    BoatChargingInitSessionStep.chooseVignet,
  )
  const {getValues} = form

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
      onPress={() => onSubmit(getValues())}
      testID="BoatChargingChooseVignetSubmitButton"
    />
  )
}
