import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingEditVignetMutation} from '@/modules/boat-charging/service'
import type {Vignet} from '@/modules/boat-charging/types'
import {isSameStringValue} from '@/modules/boat-charging/utils/isSameStringValue'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
  vignet: Vignet
}

export const BoatChargingVignetFormEditVignetButton = ({
  vignet,
  onError,
  onSuccess,
}: Props) => {
  const [editVignet, state] = useBoatChargingEditVignetMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetFormValues>()

  const onEditVignet = useCallback(
    ({postalCode, vignetNumber}: BoatChargingVignetFormValues) => {
      if (
        isSameStringValue(postalCode, vignet.postal_code) &&
        isSameStringValue(vignetNumber, vignet.vignette_number)
      ) {
        // Simply return when values are unchanged
        return Promise.resolve().then(onSuccess)
      }

      return editVignet({
        vignetId: vignet.id,
        postal_code: postalCode,
        vignette_number: vignetNumber,
      })
        .unwrap()
        .then(onSuccess, onError)
    },
    [editVignet, onSuccess, onError, vignet],
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
