import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

type Props = NavigationProps<BoatChargingRouteName.boatChargingGuestEmail>

export const BoatChargingGuestEmailScreen = ({route}: Props) => (
  <Screen testID="BoatChargingGuestEmailScreen">
    <Box grow>
      <Title text={route.params.socketId} />
    </Box>
  </Screen>
)
