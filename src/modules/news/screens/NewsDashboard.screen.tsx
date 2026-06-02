import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsList} from '@/modules/news/components/NewsList'

export const NewsDashboardScreen = () => (
  <Screen
    scroll={false}
    testID="NewsDashboardScreen">
    <NewsList
      footerComponent={<NewsletterSignup variant="news" />}
      headerComponent={
        <Box>
          <Title
            level="h4"
            text="Laatste nieuws"
          />
        </Box>
      }
      type="article"
    />
  </Screen>
)
