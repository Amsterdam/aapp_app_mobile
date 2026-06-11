import type {NavigationProps} from '@/app/navigation/types'
import type {NewsRouteName} from '@/modules/news/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {NewsArticle} from '@/modules/news/components/NewsArticle'
import {NewsArticleShareIconButton} from '@/modules/news/components/NewsArticleShareIconButton'
import {NewsArticleProvider} from '@/modules/news/providers/NewsArticle.provider'

type Props = NavigationProps<NewsRouteName.article>

export const NewsArticleScreen = ({route}: Props) => {
  const {id} = route.params || {}

  return (
    <NewsArticleProvider id={id}>
      <Screen
        headerOptions={{SideComponent: NewsArticleShareIconButton}}
        testID="NewsArticleScreen">
        <Box>
          <NewsArticle id={id} />
        </Box>
      </Screen>
    </NewsArticleProvider>
  )
}
