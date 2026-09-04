import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingSessionTransactionsList"
    title="Geen parkeergeschiedenis"
  />
)

export const ParkingSessionHistory = () => (
  <ParkingSessionsList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending={false}
    status={ParkingSessionStatus.completed}
  />
)
