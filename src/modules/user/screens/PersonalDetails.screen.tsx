import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {bottomsheetVariants} from '@/modules/user/components/bottomsheet/bottomsheetVariants'
import {PersonalDetails} from '@/modules/user/components/PersonalDetails'

export const PersonalDetailsScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="PersonalDetailsScreenBottomSheet"
        variants={bottomsheetVariants}
        withCloseButton
      />
    }
    hasStickyAlert
    testID="PersonalDetailsScreen">
    <Box>
      <PersonalDetails />
    </Box>
  </Screen>
)
