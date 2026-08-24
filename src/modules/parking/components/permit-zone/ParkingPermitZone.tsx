import type {MapFocus} from '@/components/features/map/types'
import {MapViewSwitchView} from '@/components/features/map/MapViewSwitchView'
import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingMachineSearch} from '@/modules/parking/components/permit-zone/ParkingMachineSearch'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'

type Props = {focusType: MapFocus}
export const ParkingPermitZone = (props: Props) => (
  <MapViewSwitchView
    componentMap={{
      map: ParkingPermitZoneMap,
      list: ParkingMachineList,
      search: ParkingMachineSearch,
    }}
    {...props}
  />
)
