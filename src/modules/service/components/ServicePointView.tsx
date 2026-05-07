import {useCallback, type ComponentProps} from 'react'
import type {Service} from '@/modules/service/types'
import type {Feature} from 'geojson'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'
import {ServiceMapBottomSheetVariant} from '@/modules/service/components/bottomsheet/bottomsheetVariants'
import {setSelectedServicePointId} from '@/modules/service/slice'

export const ServicePointView = (props: {id: Service['id']}) => {
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

  return (
    <MapViewSwitchView<ComponentProps<typeof ServicePointMap>>
      componentMap={{
        map: ServicePointMap,
        list: ServicePointList,
      }}
      onMapElementPress={onMapElementPress}
      {...props}
    />
  )
}
