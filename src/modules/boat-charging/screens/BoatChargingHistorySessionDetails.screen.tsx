import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingHistorySessionDetails} from '@/modules/boat-charging/components/BoatChargingHistorySessionDetails'
import {BoatChargingHistorySessionCostDetailsBottomSheet} from '@/modules/boat-charging/components/bottomsheet/BoatChargingHistorySessionCostDetailsBottomSheet'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingHistorySessionDetails>

export const BoatChargingHistorySessionDetailsScreen = ({route}: Props) => (
  <BoatChargingSessionProvider id={route.params.id}>
    <Screen
      bottomSheet={<BoatChargingHistorySessionCostDetailsBottomSheet />}
      hasStickyAlert
      scroll
      testID="BoatChargingHistorySessionDetailsScreen">
      <Box grow>
        <BoatChargingHistorySessionDetails />
      </Box>
    </Screen>
  </BoatChargingSessionProvider>
)
