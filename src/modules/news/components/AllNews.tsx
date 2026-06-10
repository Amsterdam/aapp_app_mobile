import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsDashboardHighlightedArticle} from '@/modules/news/components/NewsDashboardHighlightedArticle'
import {NewsList} from '@/modules/news/components/NewsList'

export const AllNews = () => (
  <NewsList
    footerComponent={
      <Box
        insetBottom="xl"
        insetTop="md">
        <NewsletterSignup variant="news" />
      </Box>
    }
    headerComponent={
      <Box>
        <Column gutter="lg">
          <NewsDashboardHighlightedArticle />
          <Title
            level="h4"
            text="Laatste nieuws"
          />
        </Column>
      </Box>
    }
    type="article"
  />
)
