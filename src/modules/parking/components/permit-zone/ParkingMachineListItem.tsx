import type {ParkingMachine} from '@/modules/parking/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

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
  if (!parkingMachine) {
    return null
  }

  return (
    <Box insetHorizontal="md">
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
                logging-label="ParkingMachineListItemIcon"
                name="map-marker"
                size="lg"
                testID="ParkingMachineListItemIcon"
              />
            )}
            <Column>
              <Title
                accessible={false}
                color="link"
                level="h5"
                text={parkingMachine.id}
              />

              {!!parkingMachine?.address && (
                <Paragraph accessible={false}>
                  {parkingMachine.address}
                </Paragraph>
              )}
            </Column>
          </Row>
        </Box>
      </Pressable>
    </Box>
  )
}
