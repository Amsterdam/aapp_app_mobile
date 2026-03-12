import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ServiceRouteName,
  type ServiceModalParams,
  type ServiceStackParams,
} from '@/modules/service/routes'
import {ServiceScreen} from '@/modules/service/screens/Service.screen'
import {ServiceHomeScreen} from '@/modules/service/screens/ServiceHome.screen'

export const screenConfig: StackNavigationRoutes<
  ServiceStackParams,
  ServiceRouteName
> = {
  [ServiceRouteName.overview]: {
    component: ServiceHomeScreen,
    name: ServiceRouteName.overview,
    options: {
      headerTitle: 'Handig in de stad',
    },
  },
  [ServiceRouteName.map]: {
    component: ServiceScreen,
    name: ServiceRouteName.map,
    options: {
      headerShown: false,
    },
  },
}

export const modals: StackNavigationRoutes<ServiceModalParams> = {}
