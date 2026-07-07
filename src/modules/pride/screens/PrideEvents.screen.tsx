import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const PrideEventsScreen = () => (
  <Screen
    scroll={false}
    testID="PrideEventsScreen">
    <Box>
      <Title text="Evenementen" />
    </Box>
  </Screen>
)
