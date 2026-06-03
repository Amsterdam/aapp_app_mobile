import {Screen} from '@/components/features/screen/Screen'
import {Gutter} from '@/components/ui/layout/Gutter'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsList} from '@/modules/news/components/NewsList'

export const NewsHighlightsScreen = () => (
  <Screen
    scroll
    testID="NewsHighlightsScreen">
    <NewsList
      footerComponent={
        <>
          <Gutter height="xl" />
          <NewsletterSignup variant="news" />
        </>
      }
      type="highlight"
    />
  </Screen>
)
