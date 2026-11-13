import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetteFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingAddVignetteMutation} from '@/modules/boat-charging/service'
import type {Vignette} from '@/modules/boat-charging/types'
import {isSameStringValue} from '@/modules/boat-charging/utils/isSameStringValue'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
  vignettes?: Vignette[]
}

export const BoatChargingVignetteFormAddVignetteButton = ({
  vignettes,
  onError,
  onSuccess,
}: Props) => {
  const [addVignette, state] = useBoatChargingAddVignetteMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetteFormValues>()

  const onAddVignette = useCallback(
    ({postalCode, vignetteNumber}: BoatChargingVignetteFormValues) => {
      if (
        vignettes?.some(
          vignette =>
            isSameStringValue(vignette.vignette_number, vignetteNumber) &&
            isSameStringValue(vignette.postal_code, postalCode),
        )
      ) {
        // Simply return when vignette already is connected
        return onSuccess()
      }

      return addVignette({
        postal_code: postalCode,
        vignette_number: vignetteNumber,
      })
        .unwrap()
        .then(onSuccess, onError)
    },
    [addVignette, onSuccess, onError, vignettes],
  )

  return (
    <Button
      {...state}
      label="Vignet toevoegen"
      onPress={handleSubmit(onAddVignette)}
      testID="BoatChargingVignetteFormAddButton"
    />
  )
}
