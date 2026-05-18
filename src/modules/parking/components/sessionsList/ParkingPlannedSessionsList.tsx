import {EmptyList} from '@/components/features/EmptyList'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionsListVisitor} from '@/modules/parking/components/sessionsList/ParkingSessionsListVisitor'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, ParkingSessionStatus} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingPlannedSessionsEmptyList"
    text="U heeft geen geplande parkeersessie."
  />
)

export const ParkingPlannedSessionsList = () => {
  const parkingAccount = useParkingAccount()
  const Component =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? ParkingSessionsListVisitor
      : ParkingSessionsList

  return (
    <Component
      ListEmptyComponent={ListEmptyComponent}
      sortAscending
      status={ParkingSessionStatus.planned}
    />
  )
}
