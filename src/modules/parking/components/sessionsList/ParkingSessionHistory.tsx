import {EmptyList} from '@/components/features/EmptyList'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
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
  const {data, isLoading, isError, retry, onViewableItemsChanged} =
    useParkingSessionsInfiniteScroller({
      status: ParkingSessionStatus.completed,
      sortAscending: false,
    })

  if (isError) {
    return (
      <SomethingWentWrong
        retryFn={retry}
        testID="ParkingSessionHistorySomethingWentWrong"
      />
    )
  }

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
