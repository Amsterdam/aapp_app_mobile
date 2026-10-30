import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingHistorySessionDetails} from '@/modules/boat-charging/components/BoatChargingHistorySessionDetails'
import {BoatChargingHistorySessionCostDetailsBottomSheet} from '@/modules/boat-charging/components/bottomsheet/BoatChargingHistorySessionCostDetailsBottomSheet'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = NavigationProps<BoatChargingRouteName.historySessionDetails>

export const BoatChargingHistorySessionDetailsScreen = ({route}: Props) => (
  <BoatChargingSessionProvider
    id={route.params.id}
    shouldPollSession={false}
    shouldPollSocketStatus={false}>
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
