import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type ModuleStackParams,
  MijnAmsterdamRouteName,
} from '@/modules/mijn-amsterdam/routes'
import {MijnAmsterdamDashboardScreen} from '@/modules/mijn-amsterdam/screens/MijnAmsterdamDashboard.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  MijnAmsterdamRouteName
> = {
  [MijnAmsterdamRouteName.dashboard]: {
    component: MijnAmsterdamDashboardScreen,
    name: MijnAmsterdamRouteName.dashboard,
    options: {
      headerTitle: 'Mijn Amsterdam',
    },
  },
}
