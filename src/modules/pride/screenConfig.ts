import type {StackNavigationRoutes} from '@/app/navigation/types'
import {type ModuleStackParams, PrideRouteName} from '@/modules/pride/routes'
import {PrideDetailsScreen} from '@/modules/pride/screens/PrideDetails.screen'
import {PrideEventDetailsScreen} from '@/modules/pride/screens/PrideEventDetails.screen'
import {PrideEventsScreen} from '@/modules/pride/screens/PrideEvents.screen'
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
  [PrideRouteName.events]: {
    component: PrideEventsScreen,
    name: PrideRouteName.events,
    options: {
      headerTitle: 'Pride evenementen',
      headerShown: false,
    },
  },
  [PrideRouteName.eventDetails]: {
    component: PrideEventDetailsScreen,
    name: PrideRouteName.eventDetails,
    options: {
      headerTitle: 'Evenement',
    },
  },
}
