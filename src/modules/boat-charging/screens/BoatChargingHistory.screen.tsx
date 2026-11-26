import {Screen} from '@/components/features/screen/Screen'
import {BoatChargingHistory} from '@/modules/boat-charging/components/history/BoatChargingHistory'

export const BoatChargingHistoryScreen = () => (
  <Screen
    scroll={false}
    testID="BoatChargingHistoryScreen"
    withBottomInset={false}>
    <BoatChargingHistory />
  </Screen>
)
