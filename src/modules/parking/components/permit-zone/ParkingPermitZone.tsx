import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingMachineSearch} from '@/modules/parking/components/permit-zone/ParkingMachineSearch'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'

export const ParkingPermitZone = () => (
  <MapViewSwitchView
    componentMap={{
      map: ParkingPermitZoneMap,
      list: ParkingMachineList,
      search: ParkingMachineSearch,
    }}
  />
)
