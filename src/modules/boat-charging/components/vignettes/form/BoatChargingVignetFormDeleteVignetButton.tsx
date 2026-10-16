import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import type {Alerts} from '@/modules/boat-charging/alerts'
import {useBoatChargingDeleteVignetMutation} from '@/modules/boat-charging/service'
import type {Vignet} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onError: (error: unknown[], alert: Alerts) => void
  onSuccess: () => void
  vignetId: Vignet['id']
}

export const BoatChargingVignetFormDeleteVignetButton = ({
  vignetId,
  onError,
  onSuccess,
}: Props) => {
  const [deleteVignet, state] = useBoatChargingDeleteVignetMutation()
  const {resetAlert} = useAlert()

  const onDeleteVignet = useCallback(() => {
    resetAlert()
    void deleteVignet(vignetId)
      .unwrap()
      .then(onSuccess, (...error: unknown[]) =>
        onError(error, 'vignetDeleteFailed'),
      )
  }, [deleteVignet, onSuccess, onError, vignetId, resetAlert])

  return (
    <Button
      {...state}
      icon={{name: 'trash-bin'}}
      label="Vignet verwijderen"
      onPress={onDeleteVignet}
      testID="BoatChargingVignetFormDeleteButton"
      variant="tertiaryDestructive"
    />
  )
}
