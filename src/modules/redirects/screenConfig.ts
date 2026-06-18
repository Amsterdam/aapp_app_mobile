import {StackNavigationRoutes} from '@/app/navigation/types'
import {RedirectsRouteName, ModuleStackParams} from '@/modules/redirects/routes'
import {MakeAppointmentScreen} from '@/modules/redirects/screens/MakeAppointment.screen'
import {RedirectsScreen} from '@/modules/redirects/screens/Redirects.screen'
import {SelectCityScreen} from '@/modules/redirects/screens/SelectCity.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  RedirectsRouteName
> = {
  [RedirectsRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: RedirectsRouteName.makeAppointment,
    options: {
      headerTitle: 'Afspraak maken op Stadsloket',
    },
  },
  [RedirectsRouteName.redirects]: {
    component: RedirectsScreen,
    name: RedirectsRouteName.redirects,
    options: {
      headerTitle: 'Veel gezocht',
    },
  },
  [RedirectsRouteName.selectCity]: {
    component: SelectCityScreen,
    name: RedirectsRouteName.selectCity,
    options: {
      headerTitle: 'Afspraak maken op Stadsloket',
    },
  },
}
