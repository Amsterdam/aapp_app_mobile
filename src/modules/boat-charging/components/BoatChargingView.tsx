import {useCallback, type ComponentProps} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFiltersProvider'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {BoatChargingList} from '@/modules/boat-charging/components/BoatChargingList'
import {BoatChargingMap} from '@/modules/boat-charging/components/BoatChargingMap'
import {BoatChargingBottomSheetVariant} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'
import {mapFilters} from '@/modules/boat-charging/constants/filters'
import {useLoginAsGuest} from '@/modules/boat-charging/hooks/useLoginAsGuest'
import {useBoatChargingLocationsQuery} from '@/modules/boat-charging/service'
import {
  selectBoatChargingAccessToken,
  setSelectedBoatChargingPointId,
} from '@/modules/boat-charging/slice'

export const BoatChargingView = () => {
  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  const boatChargingAccessToken = useSelector(selectBoatChargingAccessToken)

  const {isError: isErrorGuestLogin, isLoading: isLoadingGuestLogin} =
    useLoginAsGuest()

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
  } = useBoatChargingLocationsQuery(undefined, {
    skip: !boatChargingAccessToken,
  })

  return (
    <MapFiltersProvider filters={mapFilters}>
      <MapViewSwitchView<ComponentProps<typeof BoatChargingMap>>
        componentMap={{
          map: BoatChargingMap,
          list: BoatChargingList,
        }}
        geojson={data}
        isError={isErrorLocations || isErrorGuestLogin}
        isLoading={isLoadingLocations || isLoadingGuestLogin}
        onChargingPointPress={onSelectBoatChargingPoint}
      />
    </MapFiltersProvider>
  )
}
