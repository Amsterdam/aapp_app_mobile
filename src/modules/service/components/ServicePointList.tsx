import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FlatList} from 'react-native'
import type {Service, ServicePointFeature} from '@/modules/service/types'
import {MapControlsButton} from '@/components/features/map/MapControlsButton'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {
  MapControlBottomSheetKey,
  useMapControlsToggleBottomSheetButton,
} from '@/components/features/map/hooks/useMapControlsToggleBottomSheetButton'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ServicePointEmptyList} from '@/modules/service/components/ServicePointEmptyList'
import {ServicePointListItem} from '@/modules/service/components/ServicePointListItem'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/modules/service/hooks/useGetFilteredFeatures'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

export const ServicePointList = ({
  id: serviceId,
  onMapElementPress,
}: {
  id: Service['id']
  onMapElementPress: (id: ServicePointFeature['id']) => void
}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const {data: geojson, icons_to_include: icons} = service || {}

  const {onPressControlButton: onPressLayersButton} =
    useMapControlsToggleBottomSheetButton(MapControlBottomSheetKey.layers)

  const {activeFilters, filters, onPressFilter, layers} = useMapFilters()

  const pointFeatures = useMemo(
    () =>
      geojson && 'features' in geojson
        ? geojson?.features.filter(
            (f): f is ServicePointFeature => f.geometry.type === 'Point',
          )
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
    <Box insetBottom="md">
      <FlatList
        data={servicePointsByDistance}
        keyExtractor={point => String(point.id)}
        ListEmptyComponent={ServicePointEmptyList}
        ListHeaderComponent={
          <>
            {!!filters?.length && (
              <Box insetVertical="smd">
                <MapFilters
                  activeFilters={activeFilters}
                  filters={filters}
                  onPressFilter={onPressFilter}
                  testID="ServiceListFilters"
                />
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
    </Box>
  )
}
