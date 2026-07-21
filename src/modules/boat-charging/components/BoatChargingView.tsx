import {type ComponentProps} from 'react'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFiltersProvider'
import {BoatChargingList} from '@/modules/boat-charging/components/BoatChargingList'
import {BoatChargingMap} from '@/modules/boat-charging/components/BoatChargingMap'
import {mapFilters} from '@/modules/boat-charging/constants/filters'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {useSelectChargingPoint} from '@/modules/boat-charging/hooks/useSelectChargingPoint'
import {useBoatChargingLocationsQuery} from '@/modules/boat-charging/service'

export const BoatChargingView = () => {
  useOpenIdConnectAuth()
  const selectChargingPoint = useSelectChargingPoint()

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
        onChargingPointPress={selectChargingPoint}
      />
    </MapFiltersProvider>
  )
}
