import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingEditVignetMutation} from '@/modules/boat-charging/service'
import type {Vignet} from '@/modules/boat-charging/types'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
  vignetId: Vignet['id']
}

export const BoatChargingVignetFormEditVignetButton = ({
  vignetId,
  onError,
  onSuccess,
}: Props) => {
  const [editVignet, state] = useBoatChargingEditVignetMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetFormValues>()

  const onEditVignet = useCallback(
    ({postalCode, vignetNumber}: BoatChargingVignetFormValues) =>
      editVignet({
        vignetId,
        postal_code: postalCode,
        vignette_number: vignetNumber,
      })
        .unwrap()
        .then(onSuccess, onError),
    [editVignet, onSuccess, onError, vignetId],
  )

  return (
    <Button
      {...state}
      label="Wijzigingen opslaan"
      onPress={handleSubmit(onEditVignet)}
      testID="BoatChargingVignetFormEditButton"
    />
  )
}
