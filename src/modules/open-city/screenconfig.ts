import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  OpenCityStackParams,
  OpenCityRouteName,
} from '@/modules/open-city/routes'
import {OpenCityHomeScreen} from '@/modules/open-city/screens/OpenCityHome.screen'

export const screenConfig: StackNavigationRoutes<
  OpenCityStackParams,
  OpenCityRouteName
> = {
  [OpenCityRouteName.home]: {
    component: OpenCityHomeScreen,
    name: OpenCityRouteName.home,
    options: {
      headerTitle: 'Buurt idee',
    },
  },
}
