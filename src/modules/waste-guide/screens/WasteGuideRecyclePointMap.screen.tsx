import {Screen} from '@/components/features/screen/Screen'
import {WasteGuideRecyclePointMap} from '@/modules/waste-guide/components/recyclepoints/WasteGuideRecyclePointMap'

export const WasteGuideRecyclePointMapScreen = () => (
  <Screen
    testID="WasteGuideRecyclePointMapScreen"
    withBottomInset={false}>
    <WasteGuideRecyclePointMap />
  </Screen>
)
