import {StackNavigationRoutes} from '@/app/navigation/types'
import {type NewsStackParams, NewsRouteName} from '@/modules/news/routes'
import {NewsArticleScreen} from '@/modules/news/screens/NewsArticle.screen'
import {NewsDashboardScreen} from '@/modules/news/screens/NewsDashboard.screen'
import {NewsHighlightsScreen} from '@/modules/news/screens/NewsHighlights.screen'

export const screenConfig: StackNavigationRoutes<
  NewsStackParams,
  NewsRouteName
> = {
  [NewsRouteName.dashboard]: {
    component: NewsDashboardScreen,
    name: NewsRouteName.dashboard,
    options: {
      headerTitle: 'Nieuws',
      headerShown: false,
    },
  },
  [NewsRouteName.article]: {
    component: NewsArticleScreen,
    name: NewsRouteName.article,
    options: {
      headerTitle: 'Nieuws',
    },
  },
  [NewsRouteName.highlights]: {
    component: NewsHighlightsScreen,
    name: NewsRouteName.highlights,
    options: {
      headerTitle: 'Uitgelicht',
    },
  },
}
