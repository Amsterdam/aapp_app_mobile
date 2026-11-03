import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {useParkingSessionsInfiniteScroller} from '@/modules/parking/hooks/useParkingSessionsInfiniteScroller'
import {ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingSessionTransactionsList"
    title="Geen parkeergeschiedenis"
  />
)

export const ParkingSessionHistory = () => {
  const {data, isLoading, onViewableItemsChanged} =
    useParkingSessionsInfiniteScroller({
      status: ParkingSessionStatus.completed,
      sortAscending: false,
    })

  return (
    <ParkingSessionsSectionList
      isLoading={isLoading}
      ListEmptyComponent={ListEmptyComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
      sortAscending={false}
    />
  )
}
