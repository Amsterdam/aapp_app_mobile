import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {BoatChargingHeaderButton} from '@/modules/boat-charging/components/BoatChargingHeaderButton'
import {BoatChargingView} from '@/modules/boat-charging/components/BoatChargingView'
import {bottomsheetVariants} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'

export const BoatChargingScreen = () => (
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
        SideComponent: BoatChargingHeaderButton,
      }}
      scroll={false}
      testID="BoatChargingScreen"
      withBottomInset={false}>
      <BoatChargingView />
    </Screen>
  </MapViewSwitchProvider>
)
