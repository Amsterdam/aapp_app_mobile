import {StackNavigationRoutes} from '@/app/navigation/types'
import {type NewsStackParams, NewsRouteName} from '@/modules/news/routes'
import {NewsDashboardScreen} from '@/modules/news/screens/NewsDashboard.screen'

export const screenConfig: StackNavigationRoutes<
  NewsStackParams,
  NewsRouteName
> = {
  [NewsRouteName.newsDashboard]: {
    component: NewsDashboardScreen,
    name: NewsRouteName.newsDashboard,
    options: {
      headerTitle: 'Nieuws',
    },
  },
}
