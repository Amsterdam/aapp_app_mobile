import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsHighlights} from '@/modules/news/components/NewsHighlights'

export const NewsHighlightsScreen = () => (
  <Screen
    scroll
    testID="NewsHighlightsScreen">
    <Column gutter="xl">
      <Box
        insetHorizontal="md"
        insetVertical="no">
        <NewsHighlights />
      </Box>

      <NewsletterSignup variant="news" />
    </Column>
  </Screen>
)
