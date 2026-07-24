import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingHistorySessionDetails} from '@/modules/boat-charging/components/BoatChargingHistorySessionDetails'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingHistorySessionDetails>

export const BoatChargingHistorySessionDetailsScreen = ({route}: Props) => (
  <BoatChargingSessionProvider id={route.params.id}>
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="BoatChargingHistorySessionCostDetailsBottomSheet"
          withCloseButton>
          <Phrase>hoi</Phrase>
        </BottomSheet>
      }
      hasStickyAlert
      scroll
      testID="BoatChargingHistorySessionDetailsScreen">
      <Box grow>
        <BoatChargingHistorySessionDetails />
      </Box>
    </Screen>
  </BoatChargingSessionProvider>
)
