import {TransitionPresets} from '@react-navigation/stack'
import {StackNavigationRoutes} from '@/app/navigation/types'
import {CityPassDetailsHeaderButton} from '@/modules/city-pass/components/CityPassDetailsHeaderButton'
import {
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {BudgetScreen} from '@/modules/city-pass/screens/Budget.screen'
import {CityPassBlockPassScreen} from '@/modules/city-pass/screens/CityPassBlockPass.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {CityPassesScreen} from '@/modules/city-pass/screens/CityPasses.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {LogoutScreen} from '@/modules/city-pass/screens/Logout.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'

export type CityPassScreenConfigRoutes =
  | CityPassRouteName.cityPassBlockPass
  | CityPassRouteName.budget
  | CityPassRouteName.dashboard
  | CityPassRouteName.cityPassDetails
  | CityPassRouteName.cityPassLogout
  | CityPassRouteName.cityPasses
  | CityPassRouteName.securityCode

export const cityPassScreenConfig: StackNavigationRoutes<
  CityPassStackParams,
  CityPassScreenConfigRoutes
> = {
  [CityPassRouteName.dashboard]: {
    component: DashboardScreen,
    name: CityPassRouteName.dashboard,
    options: {
      headerTitle: 'Stadspas',
      headerShown: false,
    },
  },
  [CityPassRouteName.cityPassDetails]: {
    component: CityPassDetailsScreen,
    name: CityPassRouteName.cityPassDetails,
    options: {
      headerTitle: 'Stadspas',
      SideComponent: CityPassDetailsHeaderButton,
    },
  },
  [CityPassRouteName.budget]: {
    component: BudgetScreen,
    name: CityPassRouteName.budget,
  },

  [CityPassRouteName.cityPassLogout]: {
    component: LogoutScreen,
    name: CityPassRouteName.cityPassLogout,
    options: {
      headerTitle: 'Uitloggen',
    },
  },
  [CityPassRouteName.cityPasses]: {
    component: CityPassesScreen,
    name: CityPassRouteName.cityPasses,
    options: {
      headerTitle: 'Stadspas tonen',
      ...TransitionPresets.ModalFadeTransition,
    },
  },
  [CityPassRouteName.securityCode]: {
    component: SecurityCodeScreen,
    name: CityPassRouteName.securityCode,
  },
  [CityPassRouteName.cityPassBlockPass]: {
    component: CityPassBlockPassScreen,
    name: CityPassRouteName.cityPassBlockPass,
    options: {
      headerTitle: 'Pas blokkeren',
    },
  },
}
