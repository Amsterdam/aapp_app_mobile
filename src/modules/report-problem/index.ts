import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const reportProblemModule = createClientModule({
  logDimension: PiwikSessionDimension.reportProblemModule,
  name: 'ReportProblemModule',
  slug: ModuleSlug['report-problem'],
  linking: {
    [ModuleSlug['report-problem']]: ModuleSlug['report-problem'],
  },
  screenOptions: ({route}) => {
    const routeName = getFocusedRouteNameFromRoute(route)

    return {
      // disable global back gesture when viewing the report problem webview screen
      gestureEnabled: routeName !== ReportProblemRouteName.reportProblemWebView,
    }
  },
})
