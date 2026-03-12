import {skipToken} from '@reduxjs/toolkit/query'
import {pascalCase} from 'pascal-case'
import {useCallback, useState} from 'react'
import type {ServiceFeature, ServiceItem} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {ControlVariant} from '@/components/features/map/types'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePropertiesToInclude} from '@/modules/service/hooks/usePropertiesToInclude'
import {useServiceMapQuery} from '@/modules/service/service'
import {
  setSelectedServiceDetails,
  useSelectedServicePointDetails,
} from '@/modules/service/slice'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ServiceMap = ({id: serviceId}: {id: ServiceItem['id']}) => {
  const {data, isLoading, isError} = useServiceMapQuery(serviceId || skipToken)
  const {data: geojson, properties_to_include} = data || {}

  usePropertiesToInclude(properties_to_include)

  const [region, setRegion] = useState<Region | undefined>()

  const selectedServiceDetails = useSelectedServicePointDetails()
  const markerVariant = getMarkerVariant(selectedServiceDetails?.id)

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onServicePointPress = useCallback(
    (id: string, feature: ServiceFeature) => {
      dispatch(
        setSelectedServiceDetails({
          id,
          coordinates: {
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          },
          ...feature.properties,
        }),
      )
      open()
    },
    [dispatch, open],
  )

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  if (
    isError ||
    !geojson ||
    !('features' in geojson) ||
    Object.keys(geojson).length === 0
  ) {
    //TODO: error overlay
    return null
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={geojson.features.map((feature, index) => {
          const featureId = `Feature-${pascalCase(feature.properties.aapp_title)}-${index}`

          return {
            ...feature,
            properties: {
              id: featureId,
              variant: markerVariant(featureId, MarkerVariant.pin),
              onMarkerPress: () => onServicePointPress(featureId, feature),
            },
          }
        })}
        region={region}
      />
    </MapBase>
  )
}
