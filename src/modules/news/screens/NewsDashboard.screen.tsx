import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'
import {NewsletterCTA} from '@/modules/news/components/NewsletterCTA'

export const NewsDashboardScreen = () => (
  <Screen testID="NewsDashboardScreen">
    <Box>
      <Phrase>Nieuws</Phrase>
      <NewsletterCTA />
    </Box>
  </Screen>
)
