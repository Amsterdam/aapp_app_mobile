import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingGuestEmailForm} from '@/modules/boat-charging/components/BoatChargingGuestEmailForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = NavigationProps<BoatChargingRouteName.boatChargingGuestEmail>

export const BoatChargingGuestEmailScreen = ({route}: Props) => (
  <Screen testID="BoatChargingGuestEmailScreen">
    <Box grow>
      <BoatChargingGuestEmailForm socketId={route.params.socketId} />
    </Box>
  </Screen>
)
