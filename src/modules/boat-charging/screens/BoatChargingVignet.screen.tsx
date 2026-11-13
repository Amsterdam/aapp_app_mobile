import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetteForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetForm'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = NavigationProps<BoatChargingRouteName.vignette>

export const BoatChargingVignetteScreen = ({route}: Props) => (
  <Screen
    hasStickyAlert
    headerOptions={{
      headerTitle: route.params?.vignetteId
        ? 'Vignet wijzigen'
        : 'Vignet toevoegen',
    }}
    keyboardAware
    scroll
    testID="BoatChargingVignetteScreen">
    <Box grow>
      <BoatChargingVignetteForm vignetteId={route.params?.vignetteId} />
    </Box>
  </Screen>
)
