import type {NavigationProps} from '@/app/navigation/types'
import type {ParkingRouteName} from '@/modules/parking/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

type Props = NavigationProps<ParkingRouteName.account>

export const ParkingAccountScreen = ({route}: Props) => (
  <Screen testID="ParkingAccountScreen">
    <Box>
      <Title text={route.params?.reportCode ?? ''} />
    </Box>
  </Screen>
)
