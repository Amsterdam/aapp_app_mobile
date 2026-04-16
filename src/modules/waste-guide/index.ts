import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {fractionIconConfig} from '@/modules/waste-guide/constants'
import {onNotificationEvent} from '@/modules/waste-guide/notifications/onNotificationEvent'
import {resolvePathFromNotification} from '@/modules/waste-guide/notifications/resolvePathFromNotification'
import {onMyAddressChanged} from '@/modules/waste-guide/onMyAddressChanged'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {wasteGuideSlice} from '@/modules/waste-guide/slice'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const wasteGuideModule = createClientModule({
  logDimension: PiwikSessionDimension.wasteGuideModule,
  name: 'WasteGuideModule',
  reduxConfigs: [
    {
      key: ReduxKey.wasteGuide,
      persistVersion: 0,
      slice: wasteGuideSlice,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['waste-guide'],
  linking: {
    [WasteGuideRouteName.wasteGuide]: {
      path: '/afval/afvalinformatie/',
      parse: {adres: (address: string) => decodeURIComponent(address)},
      alias: [ModuleSlug['waste-guide']],
    },
  },
  icons: fractionIconConfig,
  onMyAddressChanged,
  onNotificationEvent,
  resolvePathFromNotification,
})
