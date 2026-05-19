import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionHistoryList} from '@/modules/parking/components/sessionsList/ParkingSessionHistoryList'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingSessionTransactionsList"
    text="Geen parkeergeschiedenis"
  />
)

export const ParkingSessionHistory = () => (
  <ParkingSessionHistoryList
    ListEmptyComponent={ListEmptyComponent}
    sortAscending={false}
  />
)
