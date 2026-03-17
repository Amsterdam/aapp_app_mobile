import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {PollingStations} from '@/modules/elections/components/PollingStations'
import {PollingStationsHeaderButton} from '@/modules/elections/components/PollingStationsHeaderButton'
import {bottomsheetVariants} from '@/modules/elections/components/bottomsheet/bottomsheetVariants'

export const ElectionsScreen = () => (
  <MapViewSwitchProvider>
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="PollingStationBottomSheet"
          variants={bottomsheetVariants}
        />
      }
      headerOptions={{
        SideComponent: PollingStationsHeaderButton,
      }}
      scroll={false}
      testID="ElectionsScreen"
      withBottomInset={false}>
      <PollingStations />
    </Screen>
  </MapViewSwitchProvider>
)
