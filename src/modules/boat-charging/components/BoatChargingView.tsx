import {useCallback, type ComponentProps} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFiltersProvider'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {BoatChargingList} from '@/modules/boat-charging/components/BoatChargingList'
import {BoatChargingMap} from '@/modules/boat-charging/components/BoatChargingMap'
import {BoatChargingBottomSheetVariant} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'
import {mapFilters} from '@/modules/boat-charging/constants/filters'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {useBoatChargingLocationsQuery} from '@/modules/boat-charging/service'
import {setSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'

export const BoatChargingView = () => {
  useOpenIdConnectAuth()
  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const onSelectBoatChargingPoint = useCallback(
    (id: BoatChargingLocation['id']) => {
      dispatch(setSelectedBoatChargingPointId(id))
      open(BoatChargingBottomSheetVariant.boatChargingPointDetails)
    },
    [dispatch, open],
  )

  const {
    data,
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
  } = useBoatChargingLocationsQuery()

  return (
    <MapFiltersProvider filters={mapFilters}>
      <MapViewSwitchView<ComponentProps<typeof BoatChargingMap>>
        componentMap={{
          map: BoatChargingMap,
          list: BoatChargingList,
        }}
        geojson={data}
        isError={isErrorLocations}
        isLoading={isLoadingLocations}
        onChargingPointPress={onSelectBoatChargingPoint}
      />
    </MapFiltersProvider>
  )
}
