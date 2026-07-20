import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {Service, ServicePointFeature} from '@/modules/service/types'
import type {Theme} from '@/themes/themes'
import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {
  MapControlBottomSheetKey,
  useMapControlsToggleBottomSheetButton,
} from '@/components/features/map/hooks/useMapControlsToggleBottomSheetButton'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {convertGeometryToPoint} from '@/components/features/map/utils/convertGeometryToPoint'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ServicePointEmptyList} from '@/modules/service/components/ServicePointEmptyList'
import {ServicePointListItem} from '@/modules/service/components/ServicePointListItem'
import {useServiceQuery} from '@/modules/service/service'
import {layoutStyles} from '@/styles/layoutStyles'
import {useThemable} from '@/themes/useThemable'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

export const ServicePointList = ({
  id: serviceId,
  onMapElementPress,
}: {
  id: Service['id']
  onMapElementPress: (id: ServicePointFeature['id']) => void
}) => {
  const insets = useSafeAreaInsets()
  const styles = useThemable(createStyles(insets))
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const {data: geojson, icons_to_include: icons} = service || {}

  const {onPressControlButton: onPressLayersButton} =
    useMapControlsToggleBottomSheetButton(MapControlBottomSheetKey.layers)

  const {filters, layers} = useMapFilters()

  const pointFeatures = useMemo(
    () =>
      geojson && 'features' in geojson
        ? convertGeometryToPoint(geojson.features)
        : [],
    [geojson],
  )

  const filteredFeatures = useGetFilteredFeatures({
    features: pointFeatures,
    conditionType: layers?.length ? ConditionType.or : ConditionType.and,
  })

  const {address} = useSelectedAddress(ModuleSlug.service)

  const servicePointsByDistance = useMemo(() => {
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
    return <PleaseWait testID="ServicePointListPleaseWait" />
  }

  if (!service || isError) {
    return <SomethingWentWrong testID="ServicePointListSomethingWentWrong" />
  }

  return (
    <FlatList
      contentContainerStyle={[layoutStyles.grow, styles.contentContainer]}
      data={servicePointsByDistance}
      keyExtractor={point => String(point.id)}
      ListEmptyComponent={ServicePointEmptyList}
      ListHeaderComponent={
        <>
          {!!filters?.length && (
            <Box insetVertical="smd">
              <MapFilters testID="ServiceListFilters" />
            </Box>
          )}
          {!!layers?.length && (
            <Box
              insetRight="md"
              insetVertical="smd">
              <MapControlsButton
                accessibilityLabel="Kaartlagen weergeven"
                icon={{name: 'layers'}}
                onPress={onPressLayersButton}
                testID="ServicePointListLayersButton"
                text="Kaartlagen"
              />
            </Box>
          )}

          <Box insetHorizontal="md">
            <Column gutter="lg">
              <AddressSwitch
                moduleSlug={ModuleSlug.service}
                testID="ServicePointListAddressSwitch"
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
      renderItem={({item: servicePoint}) => (
        <ServicePointListItem
          icon={
            servicePoint.properties.aapp_icon_type
              ? icons?.[servicePoint.properties.aapp_icon_type]
              : undefined
          }
          listProperty={service.list_property}
          onPress={onMapElementPress}
          servicePoint={servicePoint}
        />
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
