import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingDetails} from '@/modules/boat-charging/components/BoatChargingDetails'

type Props = NavigationProps<BoatChargingRouteName.boatChargingDetails>

export const BoatChargingDetailsScreen = ({route}: Props) => (
  <Screen
    hasStickyAlert
    scroll
    testID="BoatChargingDetailsScreen">
    <Box grow>
      <BoatChargingDetails id={route.params.id} />
    </Box>
  </Screen>
)
