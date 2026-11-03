import {ComponentType} from 'react'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  ListEmptyComponent?: ComponentType
  sortAscending?: boolean
  status: ParkingSessionStatus
}

export const ParkingSessionsListVisitor = ({
  ListEmptyComponent,
  sortAscending = false,
  status,
}: Props) => {
  const {parkingSessions, isLoading} = useGetParkingSessions(status)

  return (
    <ParkingSessionsSectionList
      isLoading={isLoading}
      ListEmptyComponent={ListEmptyComponent}
      sessions={parkingSessions}
      sortAscending={sortAscending}
    />
  )
}
