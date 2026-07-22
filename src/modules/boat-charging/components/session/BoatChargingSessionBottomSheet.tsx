import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BoatChargingSessionBottomSheet = () => (
  <BottomSheet
    scroll
    testID="BoatChargingSessionBottomSheet"
    withCloseButton>
    <Box
      insetHorizontal="md"
      insetVertical="no">
      <Column gutter="md">
        <Title
          level="h3"
          text="Geschatte kosten"
        />
        <Paragraph>
          Dit bedrag is een schatting. Na het laden berekenen we de definitieve
          kosten.
        </Paragraph>
      </Column>
    </Box>
  </BottomSheet>
)
