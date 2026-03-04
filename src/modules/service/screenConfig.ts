import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ServiceRouteName,
  type ServiceModalParams,
  type ServiceStackParams,
} from '@/modules/service/routes'
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
}

export const modals: StackNavigationRoutes<ServiceModalParams> = {}
