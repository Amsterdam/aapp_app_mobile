import {useMemo, useCallback} from 'react'
import type {
  ServiceGeoJSON,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import type {EmptyObject} from '@/types/utils'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetFilteredFeatures} from '@/modules/service/hooks/useGetFilteredFeatures'
import {
  selectSelectedServicePointId,
  setSelectedServicePointId,
} from '@/modules/service/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useGetMapData = (
  activeFilters: ServiceMapResponseFilter[],
  geojson: ServiceGeoJSON | EmptyObject | undefined,
) => {
  const dispatch = useDispatch()
  const {open} = useBottomSheet()
  const filteredFeatures = useGetFilteredFeatures({
    activeFilters,
    features: geojson && 'features' in geojson ? geojson?.features : [],
  })

  const selectedServicePointId = useSelector(selectSelectedServicePointId)
  const markerVariant = useMemo(
    () => getMarkerVariant(selectedServicePointId),
    [selectedServicePointId],
  )

  const onServicePointPress = useCallback(
    (id: string) => {
      dispatch(setSelectedServicePointId(id))
      open()
    },
    [dispatch, open],
  )

  return useMemo(
    () =>
      filteredFeatures?.map(({id, ...feature}) => ({
        ...feature,
        properties: {
          id,
          variant: markerVariant(id, MarkerVariant.pin),
          onMarkerPress: () => onServicePointPress(id),
        },
      })),
    [filteredFeatures, markerVariant, onServicePointPress],
  )
}
