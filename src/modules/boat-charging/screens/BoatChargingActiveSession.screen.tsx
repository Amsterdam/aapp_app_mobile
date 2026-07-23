import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {BoatChargingSession} from '@/modules/boat-charging/components/session/BoatChargingSession'
import {BoatChargingSessionBottomSheet} from '@/modules/boat-charging/components/session/BoatChargingSessionBottomSheet'
import {BoatChargingSessionButtons} from '@/modules/boat-charging/components/session/BoatChargingSessionButtons'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingActiveSessionDetails>

export const BoatChargingActiveSessionScreen = ({route}: Props) => (
  <BoatChargingSessionProvider id={route.params.id}>
    <Screen
      backgroundOverlay={{positionFromTop: 'sm'}}
      bottomSheet={<BoatChargingSessionBottomSheet />}
      hasStickyAlert
      scroll
      stickyFooter={<BoatChargingSessionButtons />}
      testID="BoatChargingActiveSessionScreen">
      <BoatChargingSession />
    </Screen>
  </BoatChargingSessionProvider>
)
