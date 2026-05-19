import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingActieveSessionsEmptyList"
    text="U heeft geen actieve parkeersessie."
  />
)

export const ParkingActiveSessionsList = () => (
  <ParkingSessionsList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending
    status={ParkingSessionStatus.active}
  />
)
