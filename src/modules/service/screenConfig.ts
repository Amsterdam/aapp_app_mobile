import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ServiceRouteName,
  type ServiceModalParams,
  type ServiceStackParams,
} from '@/modules/service/routes'
import {ServiceHomeScreen} from '@/modules/service/screens/ServiceHome.screen'
import {ServiceMapScreen} from '@/modules/service/screens/ServiceMap.screen'

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
    component: ServiceMapScreen,
    name: ServiceRouteName.map,
  },
}

export const modals: StackNavigationRoutes<ServiceModalParams> = {}
