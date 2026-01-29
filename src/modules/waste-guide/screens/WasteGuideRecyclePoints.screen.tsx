import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {WasteGuideRecyclePoint} from '@/modules/waste-guide/components/recyclepoints/WasteGuideRecyclePoint'
import {WasteGuideSelectRecyclePoint} from '@/modules/waste-guide/components/recyclepoints/WasteGuideSelectRecyclePoint'

export const WasteGuideRecyclePointsScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="WasteGuideSelectRecyclePointBottomSheet">
        <WasteGuideSelectRecyclePoint />
      </BottomSheet>
    }
    testID="WasteGuideRecyclePointsScreen">
    <Box>
      <Column gutter="lg">
        <Paragraph variant="intro">
          Breng uw grof afval, elektrische apparaten, klein chemisch afval en
          kringloopspullen gratis naar een Recyclepunt.
        </Paragraph>
        <WasteGuideRecyclePoint />
      </Column>
    </Box>
  </Screen>
)
