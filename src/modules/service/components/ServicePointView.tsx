import {useCallback} from 'react'
import type {Service} from '@/modules/service/types'
import type {Feature} from 'geojson'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'
import {ServiceMapBottomSheetVariant} from '@/modules/service/components/bottomsheet/bottomsheetVariants'
import {setSelectedServicePointId} from '@/modules/service/slice'

export const ServicePointView = (props: {id: Service['id']}) => {
  const {viewType} = useMapViewSwitch()

  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onMapElementPress = useCallback(
    (id: Feature['id']) => {
      if (!id) {
        return
      }

      dispatch(setSelectedServicePointId(id))
      open(ServiceMapBottomSheetVariant.servicePointDetails)
    },
    [dispatch, open],
  )

  const ServiceViewComponent =
    viewType === MapViewVariant.map ? ServicePointMap : ServicePointList

  return (
    <ServiceViewComponent
      {...props}
      onMapElementPress={onMapElementPress}
    />
  )
}
