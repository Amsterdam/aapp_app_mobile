import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  OpenCityStackParams,
  OpenCityRouteName,
} from '@/modules/open-city/routes'
import {OpenCityDetailScreen} from '@/modules/open-city/screens/OpenCityDetailScreen'
import {OpenCityFormScreen} from '@/modules/open-city/screens/OpenCityForm.screen'
import {OpenCityHomeScreen} from '@/modules/open-city/screens/OpenCityHome.screen'
import {OpenCityListScreen} from '@/modules/open-city/screens/OpenCityList.screen'

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
  [OpenCityRouteName.list]: {
    component: OpenCityListScreen,
    name: OpenCityRouteName.list,
    options: {
      headerShown: false,
      headerTitle: 'Bekijk en stem',
    },
  },
  [OpenCityRouteName.form]: {
    component: OpenCityFormScreen,
    name: OpenCityRouteName.form,
    options: {
      headerTitle: 'Stuur uw idee',
    },
  },
  [OpenCityRouteName.detail]: {
    component: OpenCityDetailScreen,
    name: OpenCityRouteName.detail,
  },
}
