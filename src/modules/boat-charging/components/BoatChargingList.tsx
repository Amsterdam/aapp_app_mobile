import {useMemo} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {BoatChargingGeoJSON} from '@/modules/boat-charging/types'
import type {Theme} from '@/themes/themes'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {BoatChargingEmptyList} from '@/modules/boat-charging/components/BoatChargingEmptyList'
import {BoatChargingListItem} from '@/modules/boat-charging/components/BoatChargingListItem'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {layoutStyles} from '@/styles/layoutStyles'
import {useThemable} from '@/themes/useThemable'
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
  const filteredFeatures = useGetFilteredFeatures({
    features: geojson?.features || [],
    conditionType: ConditionType.and,
  })
  const insets = useSafeAreaInsets()
  const styles = useThemable(createStyles(insets))

  const {address} = useSelectedAddress(ModuleSlug['boat-charging'])

  const chargingPoints = useMemo(() => {
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
    <FlatList
      contentContainerStyle={[layoutStyles.grow, styles.contentContainer]}
      data={chargingPoints}
      keyExtractor={point => String(point.properties.id)}
      ListEmptyComponent={BoatChargingEmptyList}
      ListHeaderComponent={
        <Box insetBottom="md">
          <Box insetVertical="smd">
            <MapFilters testID="BoatChargingListFilters" />
          </Box>

          <Box insetHorizontal="md">
            <Column gutter="lg">
              <AddressSwitch
                moduleSlug={ModuleSlug['boat-charging']}
                testID="BoatChargingListAddressSwitch"
              />
              {!!address && !!chargingPoints?.length && (
                <Phrase color="secondary">
                  Resultaten gesorteerd op afstand:
                </Phrase>
              )}
            </Column>
          </Box>
        </Box>
      }
      renderItem={({item}) => (
        <Box insetHorizontal="md">
          <BoatChargingListItem
            item={item}
            onPress={onChargingPointPress}
          />
        </Box>
      )}
    />
  )
}

const createStyles =
  (insets: ReturnType<typeof useSafeAreaInsets>) => (theme: Theme) =>
    StyleSheet.create({
      contentContainer: {
        paddingBottom: theme.size.spacing.md + insets.bottom,
      },
    })
