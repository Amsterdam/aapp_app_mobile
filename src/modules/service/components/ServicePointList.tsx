import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FlatList} from 'react-native'
import type {ServiceFeature, Service} from '@/modules/service/types'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ServicePointListItem} from '@/modules/service/components/ServicePointListItem'
import {useGetFilteredFeatures} from '@/modules/service/hooks/useGetFilteredFeatures'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

export const ServicePointList = ({
  id: serviceId,
  onServicePointPress,
}: {
  id: Service['id']
  onServicePointPress: (id: ServiceFeature['id']) => void
}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const geojson = service?.data

  const {activeFilters, filters, onPressFilter} = useMapFilters()
  const filteredFeatures = useGetFilteredFeatures({
    activeFilters,
    features: geojson && 'features' in geojson ? geojson?.features : [],
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

  if (!service || !servicePointsByDistance?.length || isError) {
    return <SomethingWentWrong testID="ServicePointListSomethingWentWrong" />
  }

  return (
    <Box insetBottom="md">
      <FlatList
        data={servicePointsByDistance}
        keyExtractor={point => point.id}
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
            listProperty={service.list_property}
            onPress={onServicePointPress}
            servicePoint={servicePoint}
          />
        )}
      />
    </Box>
  )
}
