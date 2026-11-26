import {EmptyList} from '@/components/features/EmptyList'
import {Box} from '@/components/ui/containers/Box'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ParkingSessionsList} from '@/modules/parking/components/sessionsList/ParkingSessionsList'
import {ParkingSessionsListVisitor} from '@/modules/parking/components/sessionsList/ParkingSessionsListVisitor'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingUpcomingSessionsEmptyList"
    text="U heeft nu geen parkeersessies."
  />
)

const ListHeaderComponent = () => (
  <Box>
    <Paragraph>
      Actieve parkeersessies en geplande sessies voor de komende 24 uur.
    </Paragraph>
  </Box>
)

export const ParkingUpcomingSessionsList = () => {
  const parkingAccount = useParkingAccount()
  const Component =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? ParkingSessionsListVisitor
      : ParkingSessionsList

  return (
    <Component
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      next24Hours
      sortAscending
    />
  )
}
