import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {BoatChargingHeaderButton} from '@/modules/boat-charging/components/BoatChargingHeaderButton'
import {BoatChargingView} from '@/modules/boat-charging/components/BoatChargingView'
import {bottomsheetVariants} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'
import {BoatChargingSessionBar} from '@/modules/boat-charging/components/session/BoatChargingSessionBar'
import {BoatChargingSessionsProvider} from '@/modules/boat-charging/providers/BoatChargingSessions.provider'

export const BoatChargingScreen = () => (
  <BoatChargingSessionsProvider>
    <MapViewSwitchProvider>
      <Screen
        bottomSheet={
          <BottomSheet
            scroll
            testID="BoatChargingPointBottomSheet"
            variants={bottomsheetVariants}
            withCloseButton
          />
        }
        headerOptions={{
          headerTitle: 'Boot laden',
          SideComponent: BoatChargingHeaderButton,
        }}
        scroll={false}
        stickyHeader={<BoatChargingSessionBar />}
        testID="BoatChargingScreen"
        withBottomInset={false}>
        <BoatChargingView />
      </Screen>
    </MapViewSwitchProvider>
  </BoatChargingSessionsProvider>
)
