import {StackNavigationRoutes} from '@/app/navigation/types'
import {type ModuleStackParams, NewsRouteName} from '@/modules/news/routes'
import {NewsArticleScreen} from '@/modules/news/screens/NewsArticle.screen'
import {NewsDashboardScreen} from '@/modules/news/screens/NewsDashboard.screen'
import {NewsHighlightsScreen} from '@/modules/news/screens/NewsHighlights.screen'
import {NewsLiveblogScreen} from '@/modules/news/screens/NewsLiveblog.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
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
      headerShown: false,
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
  [NewsRouteName.liveblog]: {
    component: NewsLiveblogScreen,
    name: NewsRouteName.liveblog,
    options: {
      headerTitle: 'Liveblog',
    },
  },
}
