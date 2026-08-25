import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingSessionCostBreakdown} from '@/modules/boat-charging/components/BoatChargingSessionCostBreakdown'

export const BoatChargingHistorySessionCostDetailsBottomSheet = () => (
  <BottomSheet
    scroll
    testID="BoatChargingHistorySessionCostDetailsBottomSheet"
    withCloseButton>
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="md">
        <Title
          level="h3"
          text="Kostenoverzicht"
        />
        <BoatChargingSessionCostBreakdown />
      </Column>
    </Box>
  </BottomSheet>
)
