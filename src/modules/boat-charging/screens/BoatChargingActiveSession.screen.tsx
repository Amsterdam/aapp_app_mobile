import type {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {boatChargingSessionBottomsheetVariants} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'
import {BoatChargingSession} from '@/modules/boat-charging/components/session/BoatChargingSession'
import {BoatChargingSessionButtons} from '@/modules/boat-charging/components/session/BoatChargingSessionButtons'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = NavigationProps<BoatChargingRouteName.activeSessionDetails>

export const BoatChargingActiveSessionScreen = ({route}: Props) => (
  <BoatChargingSessionProvider id={route.params.id}>
    <Screen
      backgroundOverlay={{positionFromTop: 'sm'}}
      bottomSheet={
        <BottomSheet
          scroll
          testID="BoatChargingSessionBottomSheet"
          variants={boatChargingSessionBottomsheetVariants}
          withCloseButton
        />
      }
      hasStickyAlert
      scroll
      stickyFooter={<BoatChargingSessionButtons />}
      testID="BoatChargingActiveSessionScreen"
      withBottomInset={false}>
      <BoatChargingSession />
    </Screen>
  </BoatChargingSessionProvider>
)
