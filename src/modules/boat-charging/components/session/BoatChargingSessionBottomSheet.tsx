import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingSessionCostBreakdown} from '@/modules/boat-charging/components/BoatChargingSessionCostBreakdown'

export const BoatChargingSessionBottomSheet = () => (
  <BottomSheet
    scroll
    testID="BoatChargingSessionBottomSheet"
    withCloseButton>
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="md">
        <Title
          level="h3"
          text="Kostenoverzicht"
        />
        <Paragraph>
          Dit bedrag is een schatting. Na het laden berekenen we de definitieve
          kosten.
        </Paragraph>
        <BoatChargingSessionCostBreakdown />
      </Column>
    </Box>
  </BottomSheet>
)
