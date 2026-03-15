import {MapViewVariant} from '@/components/features/map/MapViewSwitchContext'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingMachineSearch} from '@/modules/parking/components/permit-zone/ParkingMachineSearch'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'

export const ParkingPermitZone = () => {
  const {viewType} = useMapViewSwitch()

  if (viewType === MapViewVariant.list) {
    return <ParkingMachineList />
  }

  if (viewType === MapViewVariant.search) {
    return <ParkingMachineSearch />
  }

  return <ParkingPermitZoneMap />
}
