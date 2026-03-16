import {useCallback} from 'react'
import type {ServiceItem} from '@/modules/service/types'
import {MapViewVariant} from '@/components/features/map/MapViewSwitchContext'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'
import {setSelectedServicePointId} from '@/modules/service/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ServicePointView = (props: {id: ServiceItem['id']}) => {
  const {viewType} = useMapViewSwitch()

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onServicePointPress = useCallback(
    (id: ServiceItem['id']) => {
      dispatch(setSelectedServicePointId(id))
      open()
    },
    [dispatch, open],
  )

  const ServiceViewComponent =
    viewType === MapViewVariant.map ? ServicePointMap : ServicePointList

  return (
    <ServiceViewComponent
      {...props}
      onServicePointPress={onServicePointPress}
    />
  )
}
