import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'
import {fractionIconConfig} from '@/modules/waste-guide/constants'
import {onNotificationEvent} from '@/modules/waste-guide/notifications/onNotificationEvent'
import {resolvePathFromNotification} from '@/modules/waste-guide/notifications/resolvePathFromNotification'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {wasteGuideSlice} from '@/modules/waste-guide/slice'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const clientModule = createClientModule({
  logDimension: PiwikSessionDimension.wasteGuideModule,
  name: 'WasteGuideModule',
  reduxConfigs: [
    {
      key: ReduxKey.wasteGuide,
      persistVersion: 0,
      slice: wasteGuideSlice,
    },
  ],
  slug: ModuleSlug['waste-guide'],
  linking: {
    [WasteGuideRouteName.wasteGuide]: {
      path: '/afval/afvalinformatie/',
      parse: {adres: (address: string) => decodeURIComponent(address)},
      alias: [ModuleSlug['waste-guide']],
    },
  },
  icons: fractionIconConfig,
  onNotificationEvent,
  resolvePathFromNotification,
  extraSaveAddressText: 'U kunt ook meldingen ontvangen voor Mijn adres.',
})
