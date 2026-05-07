import {useMemo} from 'react'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {type BoatChargingPointFeature} from '@/modules/boat-charging/types'
import {getFormattedDistanceToPoint} from '@/modules/service/utils/getFormattedDistanceToPoint'
import {ModuleSlug} from '@/modules/slugs'
import {useTheme} from '@/themes/useTheme'

export const BoatChargingListItem = ({
  item,
  onPress,
}: {
  item: BoatChargingPointFeature
  onPress: (chargingPointId: string) => void
}) => {
  const {size} = useTheme()
  const {address} = useSelectedAddress(ModuleSlug['boat-charging'])

  const distanceToPoint = useMemo(
    () =>
      getFormattedDistanceToPoint(
        {
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
        },
        address?.coordinates,
      ),
    [item, address],
  )

  const {
    status,
    address: {street, number},
  } = item.properties

  const chargingPointAddress = [street, number].join(' ')
  const state = boatChargingPointStateMap[mapStatusToState[status]]

  return (
    <Box insetHorizontal="md">
      <Pressable
        accessibilityLabel={`Boot oplaadpunt ${chargingPointAddress}, status ${state.label}`}
        onPress={() => onPress(item.properties.id)}
        testID="ServicePointListItemButton">
        <Box insetVertical="sm">
          <Column gutter="xxs">
            <Title
              color="link"
              level="h5"
              text={chargingPointAddress}
            />
            <Row gutter="lg">
              <Row gutter="sm">
                <CustomMarkerIcon
                  icon={state.icon}
                  size={size.spacing.md}
                  testID="BoatChargingListItemCustomIcon"
                />
                <Phrase
                  accessible={false}
                  color="secondary">
                  {state.label}
                </Phrase>
              </Row>

              {!!distanceToPoint && (
                <Phrase
                  accessible={false}
                  color="secondary">
                  {distanceToPoint}
                </Phrase>
              )}
            </Row>
          </Column>
        </Box>
      </Pressable>
    </Box>
  )
}
