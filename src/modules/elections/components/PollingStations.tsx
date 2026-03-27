import {useCallback} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {PollingStationsList} from '@/modules/elections/components/PollingStationsList'
import {PollingStationsMap} from '@/modules/elections/components/PollingStationsMap'
import {PollingStationsBottomSheetVariant} from '@/modules/elections/components/bottomsheet/bottomsheetVariants'
import {usePollingStationsQuery} from '@/modules/elections/service'
import {setSelectedPollingStationId} from '@/modules/elections/slice'
import {PollingStation} from '@/modules/elections/types'
import {ModuleSlug} from '@/modules/slugs'

export const PollingStations = () => {
  const dispatch = useDispatch()
  const {data, isLoading, isError} = usePollingStationsQuery()
  const {address} = useSelectedAddress(ModuleSlug.elections)
  const {open} = useBottomSheet()
  const {viewType} = useMapViewSwitch()

  const onSelectPollingStation = useCallback(
    (id: PollingStation['id']) => {
      dispatch(setSelectedPollingStationId(id))
      open(PollingStationsBottomSheetVariant.pollingStationDetails)
    },
    [dispatch, open],
  )

  if (viewType === MapViewVariant.list) {
    return (
      <PollingStationsList
        address={address}
        isError={isError}
        isLoading={isLoading}
        onPress={onSelectPollingStation}
        pollingStations={data}
      />
    )
  }

  return (
    <PollingStationsMap
      address={address}
      isError={isError}
      isLoading={isLoading}
      onPress={onSelectPollingStation}
      pollingStations={data}
    />
  )
}
