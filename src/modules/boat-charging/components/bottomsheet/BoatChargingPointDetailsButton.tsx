import {Button} from '@/components/ui/buttons/Button'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

type Props = {
  onPress: () => void
  status?: ChargingPointStatus
}

export const BoatChargingPointDetailsButton = ({status, onPress}: Props) =>
  status === ChargingPointStatus.OPERATIVE ? (
    <Button
      accessibilityLabel="Ga naar het scherm waar u het opladen kunt starten"
      label="Hier opladen"
      onPress={onPress}
      testID="BoatChargingPointDetailsChargeButton"
    />
  ) : (
    <Button
      accessibilityLabel="Bekijk de details van het laadpunt"
      label="Bekijk laadpunt"
      onPress={onPress}
      testID="BoatChargingPointDetailsViewButton"
      variant="secondary"
    />
  )
