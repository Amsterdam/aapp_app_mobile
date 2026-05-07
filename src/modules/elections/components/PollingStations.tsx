import {useCallback, type ComponentProps} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {PollingStationsList} from '@/modules/elections/components/PollingStationsList'
import {PollingStationsMap} from '@/modules/elections/components/PollingStationsMap'
import {PollingStationsBottomSheetVariant} from '@/modules/elections/components/bottomsheet/bottomsheetVariants'
import {usePollingStationsQuery} from '@/modules/elections/service'
import {setSelectedPollingStationId} from '@/modules/elections/slice'
import {PollingStation} from '@/modules/elections/types'

export const PollingStations = () => {
  const dispatch = useDispatch()
  const {data, isLoading, isError} = usePollingStationsQuery()
  const {open} = useBottomSheet()

  const onSelectPollingStation = useCallback(
    (id: PollingStation['id']) => {
      dispatch(setSelectedPollingStationId(id))
      open(PollingStationsBottomSheetVariant.pollingStationDetails)
    },
    [dispatch, open],
  )

  return (
    <MapViewSwitchView<ComponentProps<typeof PollingStationsMap>>
      componentMap={{
        map: PollingStationsMap,
        list: PollingStationsList,
      }}
      isError={isError}
      isLoading={isLoading}
      onPress={onSelectPollingStation}
      pollingStations={data}
    />
  )
}
