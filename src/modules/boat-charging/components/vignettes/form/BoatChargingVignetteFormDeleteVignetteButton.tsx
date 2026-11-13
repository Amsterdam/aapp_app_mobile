import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import {useBoatChargingDeleteVignetteMutation} from '@/modules/boat-charging/service'
import type {Vignette} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onError: (error: unknown[], alert: Alerts) => void
  onSuccess: () => void
  vignetteId: Vignette['id']
}

export const BoatChargingVignetteFormDeleteVignetteButton = ({
  vignetteId,
  onError,
  onSuccess,
}: Props) => {
  const [deleteVignette, state] = useBoatChargingDeleteVignetteMutation()
  const {resetAlert} = useAlert()

  const onDeleteVignette = useCallback(() => {
    resetAlert()
    void deleteVignette(vignetteId)
      .unwrap()
      .then(onSuccess, (...error: unknown[]) =>
        onError(error, 'vignetteDeleteFailed'),
      )
  }, [deleteVignette, onSuccess, onError, vignetteId, resetAlert])

  return (
    <Button
      {...state}
      icon={{name: 'trash-bin'}}
      label="Vignet verwijderen"
      onPress={onDeleteVignette}
      testID="BoatChargingVignetteFormDeleteButton"
      variant="tertiaryDestructive"
    />
  )
}
