import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

type Props = {
  onPress: (favorite: string) => void
}

export const ParkingMachineFavoriteButton = ({onPress}: Props) => {
  const currentParkingPermit = useCurrentParkingPermit()

  if (!currentParkingPermit.parking_machine_favorite) {
    return null
  }

  return (
    <Pressable
      onPress={() => onPress(currentParkingPermit.parking_machine_favorite!)}
      testID="ParkingSessionUseFavoriteMachineButton">
      <Box
        insetLeft="sm"
        insetVertical="sm">
        <Row gutter="md">
          <Icon
            color="link"
            name="star_filled"
            size="lg"
          />
          <Phrase>{`Mijn standaard ${currentParkingPermit.parking_machine_favorite}`}</Phrase>
        </Row>
      </Box>
    </Pressable>
  )
}
