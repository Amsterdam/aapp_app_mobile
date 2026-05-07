import {useMemo} from 'react'
import {FlatList} from 'react-native'
import type {BoatChargingGeoJSON} from '@/modules/boat-charging/types'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {convertGeometryToPoint} from '@/components/features/map/utils/convertGeometryToPoint'
import {Box} from '@/components/ui/containers/Box'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {BoatChargingEmptyList} from '@/modules/boat-charging/components/BoatChargingEmptyList'
import {BoatChargingListItem} from '@/modules/boat-charging/components/BoatChargingListItem'
import {ModuleSlug} from '@/modules/slugs'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

type Props = {
  geojson?: BoatChargingGeoJSON
  isError: boolean
  isLoading: boolean
  onChargingPointPress: (id: string) => void
}

export const BoatChargingList = ({
  isError,
  isLoading,
  geojson,
  onChargingPointPress,
}: Props) => {
  const chargingPointFeatures = useMemo(
    () => (geojson ? convertGeometryToPoint(geojson.features) : []),
    [geojson],
  )

  const filteredFeatures = useGetFilteredFeatures({
    features: chargingPointFeatures,
    conditionType: ConditionType.and,
  })

  const {address} = useSelectedAddress(ModuleSlug['boat-charging'])

  const chargingPointsByDistance = useMemo(() => {
    if (!filteredFeatures?.length) {
      return []
    }

    return sortByDistanceToAddress(
      filteredFeatures.map(feat => ({
        ...feat,
        lat: feat.geometry.coordinates[1],
        lon: feat.geometry.coordinates[0],
      })),
      address,
    )
  }, [filteredFeatures, address])

  if (isLoading) {
    return <PleaseWait testID="BoatChargingListPleaseWait" />
  }

  if (isError) {
    return <SomethingWentWrong testID="BoatChargingListSomethingWentWrong" />
  }

  return (
    <SafeArea bottom>
      <Box insetBottom="md">
        <FlatList
          data={chargingPointsByDistance}
          keyExtractor={point => String(point.properties.id)}
          ListEmptyComponent={BoatChargingEmptyList}
          ListHeaderComponent={
            <>
              <Box insetVertical="smd">
                <MapFilters testID="BoatChargingListFilters" />
              </Box>

              <Box insetHorizontal="md">
                <Column gutter="lg">
                  <AddressSwitch
                    moduleSlug={ModuleSlug['boat-charging']}
                    testID="BoatChargingListAddressSwitch"
                  />

                  {!!address && (
                    <Phrase color="secondary">
                      Resultaten gesorteerd op afstand:
                    </Phrase>
                  )}
                </Column>
              </Box>
            </>
          }
          renderItem={({item}) => (
            <BoatChargingListItem
              item={item}
              onPress={onChargingPointPress}
            />
          )}
        />
      </Box>
    </SafeArea>
  )
}
