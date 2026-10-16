import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingAddVignetMutation} from '@/modules/boat-charging/service'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
}

export const BoatChargingVignetFormAddVignetButton = ({
  onError,
  onSuccess,
}: Props) => {
  const [addVignet, state] = useBoatChargingAddVignetMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetFormValues>()

  const onAddVignet = useCallback(
    ({postalCode, vignetNumber}: BoatChargingVignetFormValues) =>
      addVignet({
        postal_code: postalCode,
        vignette_number: vignetNumber,
      })
        .unwrap()
        .then(onSuccess, onError),
    [addVignet, onSuccess, onError],
  )

  return (
    <Button
      {...state}
      label="Vignet toevoegen"
      onPress={handleSubmit(onAddVignet)}
      testID="BoatChargingVignetFormAddButton"
    />
  )
}
