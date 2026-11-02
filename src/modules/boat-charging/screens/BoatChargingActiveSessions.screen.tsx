import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingActiveSessionsList} from '@/modules/boat-charging/components/BoatChargingActiveSessionsList'
import {BoatChargingSessionsProvider} from '@/modules/boat-charging/providers/BoatChargingSessions.provider'

export const BoatChargingActiveSessionsScreen = () => (
  <BoatChargingSessionsProvider>
    <Screen
      scroll
      testID="BoatChargingActiveSessionsScreen">
      <Box grow>
        <BoatChargingActiveSessionsList />
      </Box>
    </Screen>
  </BoatChargingSessionsProvider>
)
