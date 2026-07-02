import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingTermsAndConditions>

export const BoatChargingTermsAndConditionsScreen = (_props: Props) => (
  <Screen testID="BoatChargingTermsAndConditionsScreen">
    <Box>
      <Title text="Voorwaarden" />
    </Box>
  </Screen>
)
