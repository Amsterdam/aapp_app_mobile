import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsHighlights} from '@/modules/news/components/NewsHighlights'

export const NewsHighlightsScreen = () => (
  <Screen
    scroll
    testID="NewsHighlightsScreen">
    <Box insetTop="xl">
      <Column gutter="xl">
        <NewsHighlights />

        <NewsletterSignup variant="news" />
      </Column>
    </Box>
  </Screen>
)
