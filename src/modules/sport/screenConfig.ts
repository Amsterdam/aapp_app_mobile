import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  SportRouteName,
  type SportModalParams,
  type SportStackParams,
} from '@/modules/sport/routes'
import {SportHomeScreen} from '@/modules/sport/screens/SportHome.screen'
import {SportItemScreen} from '@/modules/sport/screens/SportItem.screen'
import {SportItemDetailScreen} from '@/modules/sport/screens/SportItemDetail.screen'
import {SportTicketPurchaseScreen} from '@/modules/sport/screens/SportTicketPurchase.screen'

export const screenConfig: StackNavigationRoutes<
  SportStackParams,
  SportRouteName
> = {
  [SportRouteName.overview]: {
    component: SportHomeScreen,
    name: SportRouteName.overview,
    options: {
      headerTitle: 'Sport',
    },
  },
  [SportRouteName.sportCategory]: {
    component: SportItemScreen,
    name: SportRouteName.sportCategory,
  },
  [SportRouteName.sportItemDetail]: {
    component: SportItemDetailScreen,
    name: SportRouteName.sportItemDetail,
  },
  [SportRouteName.ticketPurchase]: {
    component: SportTicketPurchaseScreen,
    name: SportRouteName.ticketPurchase,
    options: {
      headerTitle: 'Kaartje kopen',
    },
  },
}

export const modals: StackNavigationRoutes<SportModalParams> = {}
