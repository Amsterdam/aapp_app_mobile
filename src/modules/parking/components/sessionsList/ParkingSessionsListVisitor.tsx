import {ComponentType} from 'react'
import {ParkingSessionsFlatList} from '@/modules/parking/components/sessionsList/ParkingSessionFlatList'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingSessionStatus} from '@/modules/parking/types'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
} & Or<
  {status: ParkingSessionStatus},
  {
    /**
     *  When passed, the active and planned sessions for the upcoming 24 hours will be retrieved
     */
    next24Hours: true
  }
>

export const ParkingSessionsListVisitor = ({
  status,
  next24Hours,
  ...rest
}: Props) => {
  const {parkingSessions, isLoading} = useGetParkingSessions(
    (next24Hours ?? status) as Parameters<typeof useGetParkingSessions>[0],
  )

  return (
    <ParkingSessionsFlatList
      isLoading={isLoading}
      sessions={parkingSessions}
      {...rest}
    />
  )
}
