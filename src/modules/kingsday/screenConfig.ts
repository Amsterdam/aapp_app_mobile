import type {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type KingsdayStackParams,
  KingsdayRouteName,
} from '@/modules/kingsday/routes'
import {KingsdayDetailsScreen} from '@/modules/kingsday/screens/KingsdayDetails.screen'
import {KingsdayOverviewScreen} from '@/modules/kingsday/screens/KingsdayOverview.screen'

export const screenConfig: StackNavigationRoutes<
  KingsdayStackParams,
  KingsdayRouteName
> = {
  [KingsdayRouteName.overview]: {
    component: KingsdayOverviewScreen,
    name: KingsdayRouteName.overview,
    options: {
      headerTitle: 'Koningsdag',
    },
  },
  [KingsdayRouteName.details]: {
    component: KingsdayDetailsScreen,
    name: KingsdayRouteName.details,
    options: {
      headerShown: false,
    },
  },
}
