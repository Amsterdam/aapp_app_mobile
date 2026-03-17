import {useCallback} from 'react'
import type {ServiceFeature, Service} from '@/modules/service/types'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFiltersProvider'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'
import {setSelectedServicePointId} from '@/modules/service/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ServicePointView = (props: {id: Service['id']}) => {
  const {viewType} = useMapViewSwitch()

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onServicePointPress = useCallback(
    (id: ServiceFeature['id']) => {
      dispatch(setSelectedServicePointId(id))
      open()
    },
    [dispatch, open],
  )

  const ServiceViewComponent =
    viewType === MapViewVariant.map ? ServicePointMap : ServicePointList

  return (
    <MapFiltersProvider serviceId={props.id}>
      <ServiceViewComponent
        {...props}
        onServicePointPress={onServicePointPress}
      />
    </MapFiltersProvider>
  )
}
