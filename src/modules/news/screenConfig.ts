import {StackNavigationRoutes} from '@/app/navigation/types'
import {type NewsStackParams, NewsRouteName} from '@/modules/news/routes'
import {NewsArticleScreen} from '@/modules/news/screens/NewsArticle.screen'
import {NewsDashboardScreen} from '@/modules/news/screens/NewsDashboard.screen'

export const screenConfig: StackNavigationRoutes<
  NewsStackParams,
  NewsRouteName
> = {
  [NewsRouteName.dashboard]: {
    component: NewsDashboardScreen,
    name: NewsRouteName.dashboard,
    options: {
      headerTitle: 'Nieuws',
    },
  },
  [NewsRouteName.article]: {
    component: NewsArticleScreen,
    name: NewsRouteName.article,
    options: {
      headerTitle: 'Nieuws',
    },
  },
}
