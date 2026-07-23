import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingHistory} from '@/modules/boat-charging/components/history/BoatChargingHistory'

export const BoatChargingHistoryScreen = () => (
  <Screen
    scroll={false}
    testID="BoatChargingHistoryScreen">
    <Box grow>
      <BoatChargingHistory />
    </Box>
  </Screen>
)
