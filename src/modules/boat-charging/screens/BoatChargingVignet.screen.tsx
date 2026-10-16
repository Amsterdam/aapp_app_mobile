import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetForm'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = NavigationProps<BoatChargingRouteName.vignet>

export const BoatChargingVignetScreen = ({route}: Props) => (
  <Screen
    hasStickyAlert
    headerOptions={{
      headerTitle: route.params?.vignetId
        ? 'Vignet wijzigen'
        : 'Vignet toevoegen',
    }}
    scroll
    testID="BoatChargingVignetScreen">
    <Box grow>
      <BoatChargingVignetForm vignetId={route.params?.vignetId} />
    </Box>
  </Screen>
)
