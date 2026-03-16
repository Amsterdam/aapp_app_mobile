import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FlatList} from 'react-native'
import type {ServiceFeature, ServiceItem} from '@/modules/service/types'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ServicePointListItem} from '@/modules/service/components/ServicePointListItem'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

export const ServicePointList = ({
  id: serviceId,
  onServicePointPress,
}: {
  id: ServiceItem['id']
  onServicePointPress: (id: ServiceFeature['id']) => void
}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)

  const {address} = useSelectedAddress(ModuleSlug.service)

  const servicePointsByDistance = useMemo(() => {
    if (!service || !('features' in service.data)) {
      return []
    }

    return sortByDistanceToAddress(
      service?.data.features.map(feat => ({
        ...feat,
        lat: feat.geometry.coordinates[1],
        lon: feat.geometry.coordinates[0],
      })),
      address,
    )
  }, [service, address])

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
          <Box
            insetBottom="sm"
            insetHorizontal="md"
            insetTop="lg">
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
