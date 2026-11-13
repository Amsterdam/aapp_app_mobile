import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import type {BoatChargingVignetteFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingEditVignetteMutation} from '@/modules/boat-charging/service'
import type {Vignette} from '@/modules/boat-charging/types'
import {isSameStringValue} from '@/modules/boat-charging/utils/isSameStringValue'

type Props = {
  onError: (error?: unknown[], alert?: Alerts) => void
  onSuccess: () => void
  vignette: Vignette
}

export const BoatChargingVignetteFormEditVignetteButton = ({
  vignette,
  onError,
  onSuccess,
}: Props) => {
  const [editVignette, state] = useBoatChargingEditVignetteMutation()
  const {handleSubmit} = useFormContext<BoatChargingVignetteFormValues>()

  const onEditVignette = useCallback(
    ({postalCode, vignetteNumber}: BoatChargingVignetteFormValues) => {
      if (
        isSameStringValue(postalCode, vignette.postal_code) &&
        isSameStringValue(vignetteNumber, vignette.vignette_number)
      ) {
        // Simply return when values are unchanged
        return Promise.resolve().then(onSuccess)
      }

      return editVignette({
        vignetteId: vignette.id,
        postal_code: postalCode,
        vignette_number: vignetteNumber,
      })
        .unwrap()
        .then(onSuccess, onError)
    },
    [editVignette, onSuccess, onError, vignette],
  )

  return (
    <Button
      {...state}
      label="Wijzigingen opslaan"
      onPress={handleSubmit(onEditVignette)}
      testID="BoatChargingVignetteFormEditButton"
    />
  )
}
