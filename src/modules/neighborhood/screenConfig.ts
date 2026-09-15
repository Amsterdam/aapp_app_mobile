import type {StackNavigationRoutes} from '@/app/navigation/types'
import {NeighborhoodBoardHeaderButton} from '@/modules/neighborhood/components/NeighborhoodBoardHeaderButton'
import {
  type ModuleStackParams,
  NeighborhoodRouteName,
} from '@/modules/neighborhood/routes'
import {NeighborhoodBoardScreen} from '@/modules/neighborhood/screens/NeighborhoodBoard.screen'
import {NeighborhoodBoardItemFormScreen} from '@/modules/neighborhood/screens/NeighborhoodBoardItemForm.screen'
import {NeighborhoodBoardItemImageFormScreen} from '@/modules/neighborhood/screens/NeighborhoodBoardItemImageForm.screen'
import {NeighborhoodOverviewScreen} from '@/modules/neighborhood/screens/NeighborhoodOverview.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  NeighborhoodRouteName
> = {
  [NeighborhoodRouteName.overview]: {
    component: NeighborhoodOverviewScreen,
    name: NeighborhoodRouteName.overview,
    options: {
      headerTitle: 'Mijn buurt',
    },
  },
  [NeighborhoodRouteName.board]: {
    component: NeighborhoodBoardScreen,
    name: NeighborhoodRouteName.board,
    options: {
      headerTitle: 'Buurtprikbord',
      SideComponent: NeighborhoodBoardHeaderButton,
    },
  },
  [NeighborhoodRouteName.addBoardItemImage]: {
    component: NeighborhoodBoardItemImageFormScreen,
    name: NeighborhoodRouteName.addBoardItemImage,
    options: {
      headerTitle: 'Nieuw briefje 1/2',
    },
  },
  [NeighborhoodRouteName.addBoardItem]: {
    component: NeighborhoodBoardItemFormScreen,
    name: NeighborhoodRouteName.addBoardItem,
    options: {
      headerTitle: 'Nieuw briefje 2/2',
    },
  },
}
