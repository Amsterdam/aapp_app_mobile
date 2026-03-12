import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState} from 'react'
import type {ServiceItem} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {ControlVariant} from '@/components/features/map/types'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {
  selectSelectedServicePointId,
  setSelectedServicePointId,
} from '@/modules/service/slice'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ServiceMap = ({id: serviceId}: {id: ServiceItem['id']}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const geojson = service?.data

  const [region, setRegion] = useState<Region | undefined>()

  const selectedServicePointId = useSelector(selectSelectedServicePointId)
  const markerVariant = getMarkerVariant(selectedServicePointId)

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onServicePointPress = useCallback(
    (id: string) => {
      dispatch(setSelectedServicePointId(id))
      open()
    },
    [dispatch, open],
  )

  const data = useMemo(
    () =>
      geojson && 'features' in geojson
        ? geojson?.features?.map(({id, ...feature}) => ({
            ...feature,
            properties: {
              id,
              variant: markerVariant(id, MarkerVariant.pin),
              onMarkerPress: () => onServicePointPress(id),
            },
          }))
        : [],
    [geojson, markerVariant, onServicePointPress],
  )

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      isError={isError || !data?.length}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={data}
        region={region}
      />
    </MapBase>
  )
}
