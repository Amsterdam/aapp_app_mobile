import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingAddVignetMutation} from '@/modules/boat-charging/service'
import type {Vignet} from '@/modules/boat-charging/types'
import {isSameStringValue} from '@/modules/boat-charging/utils/isSameStringValue'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
  vignettes?: Vignet[]
}

export const BoatChargingVignetFormAddVignetButton = ({
  vignettes,
  onError,
  onSuccess,
}: Props) => {
  const [addVignet, state] = useBoatChargingAddVignetMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetFormValues>()

  const onAddVignet = useCallback(
    ({postalCode, vignetNumber}: BoatChargingVignetFormValues) => {
      if (
        vignettes?.some(
          vignet =>
            isSameStringValue(vignet.vignette_number, vignetNumber) &&
            isSameStringValue(vignet.postal_code, postalCode),
        )
      ) {
        // Simply return when vignet already is connected
        return onSuccess()
      }

      return addVignet({
        postal_code: postalCode,
        vignette_number: vignetNumber,
      })
        .unwrap()
        .then(onSuccess, onError)
    },
    [addVignet, onSuccess, onError, vignettes],
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
