import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {PrideEventDateBottomSheet} from '@/modules/pride/components/PrideEventDateBottomSheet'
import {PrideEventTypeBottomSheet} from '@/modules/pride/components/PrideEventTypeBottomSheet'

const bottomSheetVariants = {
  type: PrideEventTypeBottomSheet,
  date: PrideEventDateBottomSheet,
}

export const PrideEventsBottomSheet = () => (
  <BottomSheet
    testID="PrideEventBottomSheet"
    variants={bottomSheetVariants}
    withCloseButton
  />
)
