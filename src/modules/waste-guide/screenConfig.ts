import {StackNavigationRoutes} from '@/app/navigation/types'
import {WasteGuideHeaderSideComponent} from '@/modules/waste-guide/components/WasteGuideHeaderSideComponent'
import {
  WasteGuideModalParams,
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {WasteGuideScreen} from '@/modules/waste-guide/screens/WasteGuide.screen'
import {WasteGuideCalendarScreen} from '@/modules/waste-guide/screens/WasteGuideCalendar.screen'
import {WasteGuideFeedbackScreen} from '@/modules/waste-guide/screens/WasteGuideFeedback.screen'
import {WasteGuideFractionScreen} from '@/modules/waste-guide/screens/WasteGuideFraction.screen'
import {WasteGuideRecyclePointMapScreen} from '@/modules/waste-guide/screens/WasteGuideRecyclePointMap.screen'
import {WasteGuideRecyclePointsScreen} from '@/modules/waste-guide/screens/WasteGuideRecyclePoints.screen'

export const screenConfig: StackNavigationRoutes<
  WasteGuideStackParams,
  WasteGuideRouteName
> = {
  [WasteGuideRouteName.wasteGuide]: {
    component: WasteGuideScreen,
    name: WasteGuideRouteName.wasteGuide,
    options: {
      headerShown: false,
      headerTitle: 'Afvalwijzer',
    },
  },
  [WasteGuideRouteName.wasteGuideCalendar]: {
    component: WasteGuideCalendarScreen,
    name: WasteGuideRouteName.wasteGuideCalendar,
    options: {
      headerTitle: 'Afvalkalender',
      SideComponent: WasteGuideHeaderSideComponent,
    },
  },
  [WasteGuideRouteName.wasteGuideFeedback]: {
    component: WasteGuideFeedbackScreen,
    name: WasteGuideRouteName.wasteGuideFeedback,
    options: {
      headerTitle: 'Melding afvalinformatie doen',
    },
  },
  [WasteGuideRouteName.wasteGuideFraction]: {
    component: WasteGuideFractionScreen,
    name: WasteGuideRouteName.wasteGuideFraction,
  },
  [WasteGuideRouteName.wasteGuideRecyclePointMap]: {
    component: WasteGuideRecyclePointMapScreen,
    name: WasteGuideRouteName.wasteGuideRecyclePointMap,
  },
  [WasteGuideRouteName.wasteGuideRecyclePoints]: {
    component: WasteGuideRecyclePointsScreen,
    name: WasteGuideRouteName.wasteGuideRecyclePoints,
    options: {
      headerShown: false,
      headerTitle: 'Recyclepunt',
    },
  },
}

export const modals: StackNavigationRoutes<WasteGuideModalParams> = {}
