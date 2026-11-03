import {Screen} from '@/components/features/screen/Screen'
import {ParkingSessionHistory} from '@/modules/parking/components/sessionsList/ParkingSessionHistory'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingSessionHistoryScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingSessionHistoryScreen"
      withBottomInset={false}>
      <ParkingSessionHistory />
    </Screen>
  </CurrentPermitProvider>
)
