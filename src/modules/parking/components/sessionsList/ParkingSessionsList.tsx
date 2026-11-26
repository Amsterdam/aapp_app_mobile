import type {ComponentType} from 'react'
import {ParkingSessionsFlatList} from '@/modules/parking/components/sessionsList/ParkingSessionFlatList'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {useParkingSessionsInfiniteScroller} from '@/modules/parking/hooks/useParkingSessionsInfiniteScroller'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  inSections?: boolean
  sortAscending?: boolean
} & Or<
  {status: ParkingSessionStatus},
  {
    /**
     *  When passed, the active and planned sessions for the upcoming 24 hours will be retrieved
     */
    next24Hours: true
  }
>

export const ParkingSessionsList = ({
  sortAscending = false,
  status,
  next24Hours,
  inSections = false,
  ...rest
}: Props) => {
  const {data, isLoading, onViewableItemsChanged} =
    useParkingSessionsInfiniteScroller({
      status: next24Hours ? ParkingSessionStatus.activeOrPlanned : status,
      next_24_hours: next24Hours,
      sortAscending,
    })

  return inSections ? (
    <ParkingSessionsSectionList
      isLoading={isLoading}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
      sortAscending={sortAscending}
      {...rest}
    />
  ) : (
    <ParkingSessionsFlatList
      isLoading={isLoading}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
      {...rest}
    />
  )
}
