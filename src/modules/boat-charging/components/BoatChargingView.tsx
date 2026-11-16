import {useIsFocused} from '@react-navigation/native'
import {useEffect, type ComponentProps} from 'react'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFilters.provider'
import {BoatChargingList} from '@/modules/boat-charging/components/BoatChargingList'
import {BoatChargingMap} from '@/modules/boat-charging/components/BoatChargingMap'
import {mapFilters} from '@/modules/boat-charging/constants/filters'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {useSelectChargingPoint} from '@/modules/boat-charging/hooks/useSelectChargingPoint'
import {useBoatChargingLocationsQuery} from '@/modules/boat-charging/service'

export const BoatChargingView = () => {
  useOpenIdConnectAuth()
  const selectChargingPoint = useSelectChargingPoint()
  const {reset} = useNewSessionFormContext()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      // Reset the session form when the user arrives/returns on this screen
      reset()
    }
  }, [reset, isFocused])

  const {
    data,
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
  } = useBoatChargingLocationsQuery(undefined, {
    pollingInterval: isFocused ? 20000 : 0,
  })

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
        onChargingPointPress={selectChargingPoint}
      />
    </MapFiltersProvider>
  )
}
