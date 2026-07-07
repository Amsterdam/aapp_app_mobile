import type {StackNavigationRoutes} from '@/app/navigation/types'
import {type ModuleStackParams, PrideRouteName} from '@/modules/pride/routes'
import {PrideDetailsScreen} from '@/modules/pride/screens/PrideDetails.screen'
import {PrideOverviewScreen} from '@/modules/pride/screens/PrideOverview.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  PrideRouteName
> = {
  [PrideRouteName.overview]: {
    component: PrideOverviewScreen,
    name: PrideRouteName.overview,
    options: {
      headerTitle: 'Pride',
    },
  },
  [PrideRouteName.details]: {
    component: PrideDetailsScreen,
    name: PrideRouteName.details,
    options: {
      headerShown: false,
    },
  },
}
