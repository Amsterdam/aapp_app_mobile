import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Title} from '@/components/ui/text/Title'

export const BoatChargingHistorySessionCostDetailsBottomSheet = () => (
  <BottomSheet
    scroll
    testID="BoatChargingHistorySessionCostDetailsBottomSheet"
    withCloseButton>
    <Title
      level="h3"
      text="Kostenoverzicht"
    />
    {/*
    The split out costs are not available from the backend, so we cannot yet display them here.
    */}
  </BottomSheet>
)
