import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingDetails} from '@/modules/boat-charging/components/BoatChargingDetails'
import {BoatChargingDetailsSocketSubmitButton} from '@/modules/boat-charging/components/BoatChargingDetailsSocketSubmitButton'
import {BoatChargingSessionBar} from '@/modules/boat-charging/components/session/BoatChargingSessionBar'
import {BoatChargingSessionsProvider} from '@/modules/boat-charging/providers/BoatChargingSessions.provider'

type Props = NavigationProps<BoatChargingRouteName.locationDetails>

export const BoatChargingLocationDetailsScreen = ({route}: Props) => (
  <BoatChargingSessionsProvider>
    <Screen
      hasStickyAlert
      scroll
      stickyFooter={
        <BoatChargingDetailsSocketSubmitButton id={route.params.id} />
      }
      stickyHeader={<BoatChargingSessionBar />}
      testID="BoatChargingLocationDetailsScreen">
      <Box grow>
        <BoatChargingDetails id={route.params.id} />
      </Box>
    </Screen>
  </BoatChargingSessionsProvider>
)
