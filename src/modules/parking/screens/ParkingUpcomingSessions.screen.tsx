import {Screen} from '@/components/features/screen/Screen'
import {ParkingUpcomingSessionsList} from '@/modules/parking/components/sessionsList/ParkingUpcomingSessionsList'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingUpcomingSessionsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingUpcomingSessionsScreen"
      withBottomInset={false}>
      <ParkingUpcomingSessionsList />
    </Screen>
  </CurrentPermitProvider>
)
