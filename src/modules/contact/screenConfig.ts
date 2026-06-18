import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ContactRouteName,
  type ModuleStackParams,
} from '@/modules/contact/routes'
import {CityOfficeScreen} from '@/modules/contact/screens/CityOffice.screen'
import {ContactScreen} from '@/modules/contact/screens/Contact.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  ContactRouteName
> = {
  [ContactRouteName.cityOffice]: {
    component: CityOfficeScreen,
    name: ContactRouteName.cityOffice,
    options: {
      headerShown: false,
      headerTitle: 'Stadsloketten',
    },
  },
  [ContactRouteName.contact]: {
    component: ContactScreen,
    name: ContactRouteName.contact,
    options: {
      headerTitle: 'Contact',
    },
  },
}
