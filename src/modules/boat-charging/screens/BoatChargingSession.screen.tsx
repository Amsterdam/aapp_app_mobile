import {Screen} from '@/components/features/screen/Screen'
import {BoatChargingSession} from '@/modules/boat-charging/components/session/BoatChargingSession'
import {BoatChargingSessionButtons} from '@/modules/boat-charging/components/session/BoatChargingSessionButtons'
import {BoatChargingSessionsProvider} from '@/modules/boat-charging/providers/BoatChargingSessions.provider'

export const BoatChargingSessionScreen = () => (
  <BoatChargingSessionsProvider>
    <Screen
      backgroundOverlay={{positionFromTop: 'sm'}}
      hasStickyAlert
      scroll
      stickyFooter={<BoatChargingSessionButtons />}
      testID="BoatChargingSessionScreen">
      <BoatChargingSession />
    </Screen>
  </BoatChargingSessionsProvider>
)
