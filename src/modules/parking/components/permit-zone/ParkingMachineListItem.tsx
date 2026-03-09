import {useMemo} from 'react'
import type {ParkingMachine} from '@/modules/parking/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

type Props = {
  onPress: (parkingMachineId: ParkingMachine['id']) => void
  parkingMachine: ParkingMachine
  showIcon?: boolean
}

export const ParkingMachineListItem = ({
  showIcon = false,
  parkingMachine,
  onPress,
}: Props) => {
  const {parking_machine_favorite} = useCurrentParkingPermit()

  const isFavorite = useMemo(
    () => parking_machine_favorite === parkingMachine?.id,
    [parking_machine_favorite, parkingMachine],
  )

  if (!parkingMachine) {
    return null
  }

  return (
    <Pressable
      accessibilityLabel={`Parkeerautomaat ${parkingMachine.id}`}
      onPress={() => onPress(parkingMachine.id)}
      testID="ParkingMachineListItemButton">
      <Box
        insetLeft="sm"
        insetVertical={parkingMachine?.address ? 'sm' : 'md'}>
        <Row gutter="smd">
          {!!showIcon && (
            <Icon
              color="link"
              isFilled={isFavorite}
              logging-label="ParkingMachineListItemIcon"
              name={isFavorite ? 'star' : 'map-marker'}
              size="lg"
              testID="ParkingMachineListItemIcon"
            />
          )}
          <Column>
            <Phrase
              accessible={false}
              color="link"
              emphasis="strong">
              {parkingMachine.id}
              {!!isFavorite && <Phrase> - Ingesteld als favoriet </Phrase>}
            </Phrase>

            {!!parkingMachine?.address && (
              <Paragraph
                accessible={false}
                color="secondary">
                {parkingMachine.address}
              </Paragraph>
            )}
          </Column>
        </Row>
      </Box>
    </Pressable>
  )
}
