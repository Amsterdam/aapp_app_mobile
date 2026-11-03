import type {ComponentType} from 'react'
import {ParkingSessionsFlatList} from '@/modules/parking/components/sessionsList/ParkingSessionFlatList'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {useParkingSessionsInfiniteScroller} from '@/modules/parking/hooks/useParkingSessionsInfiniteScroller'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  ListEmptyComponent?: ComponentType
  inSections?: boolean
  sortAscending?: boolean
  status: ParkingSessionStatus
}

export const ParkingSessionsList = ({
  ListEmptyComponent,
  sortAscending = false,
  status,
  inSections = false,
}: Props) => {
  const {data, isLoading, onViewableItemsChanged} =
    useParkingSessionsInfiniteScroller({status, sortAscending})

  return inSections ? (
    <ParkingSessionsSectionList
      isLoading={isLoading}
      ListEmptyComponent={ListEmptyComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
      sortAscending={sortAscending}
    />
  ) : (
    <ParkingSessionsFlatList
      isLoading={isLoading}
      ListEmptyComponent={ListEmptyComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
    />
  )
}
