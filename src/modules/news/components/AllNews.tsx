import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsList} from '@/modules/news/components/NewsList'

export const AllNews = () => (
  <NewsList
    footerComponent={
      <>
        <Gutter height="md" />
        <NewsletterSignup variant="news" />
      </>
    }
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
)
