import type {Feature} from 'geojson'
import {useCallback, type ComponentProps} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import type {MapFocus} from '@/components/features/map/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'
import {ServiceMapBottomSheetVariant} from '@/modules/service/exports/bottomsheetVariants'
import type {Service} from '@/modules/service/exports/types'
import {setSelectedServicePointId} from '@/modules/service/slice'

type Props = {
  focusType?: MapFocus
  id: Service['id']
}

export const ServicePointView = (props: Props) => {
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
