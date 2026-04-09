import {ContactRouteName} from '@/modules/contact/routes'
import {contactSlice} from '@/modules/contact/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const contactModule = createClientModule({
  linking: {
    [ContactRouteName.contact]: {
      path: `/${ModuleSlug.contact}`,
    },
  },
  logDimension: PiwikSessionDimension.contactModule,
  name: 'ContactModule',
  reduxConfigs: [
    {
      key: ReduxKey.contact,
      persistVersion: 0,
      slice: contactSlice,
    },
  ],
  slug: ModuleSlug.contact,
})
