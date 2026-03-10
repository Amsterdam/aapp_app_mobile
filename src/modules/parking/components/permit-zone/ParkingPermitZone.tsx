import {ParkingMachineList} from '@/modules/parking/components/permit-zone/ParkingMachineList'
import {ParkingMachineSearch} from '@/modules/parking/components/permit-zone/ParkingMachineSearch'
import {ParkingPermitZoneMap} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMap'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'

export const ParkingPermitZone = () => {
  const {viewType} = usePermitMapContext()

  if (viewType === 'list') {
    return <ParkingMachineList />
  }

  if (viewType === 'search') {
    return <ParkingMachineSearch />
  }

  return <ParkingPermitZoneMap />
}
