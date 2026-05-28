import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'
import {NewsLetterCTA} from '@/modules/news/components/NewsLetterCTA'

export const NewsDashboardScreen = () => (
  <Screen testID="NewsDashboardScreen">
    <Box>
      <Phrase>Nieuws</Phrase>
      <NewsLetterCTA />
    </Box>
  </Screen>
)
