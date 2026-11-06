import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingPlannedSessionsEmptyList"
    title="U heeft geen geplande parkeersessie."
  />
)

export const ParkingPlannedSessionsList = () => (
  <ParkingSessionsList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending
    status={ParkingSessionStatus.planned}
  />
)
