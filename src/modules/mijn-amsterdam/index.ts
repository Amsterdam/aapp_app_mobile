import {useIsLoggedInMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useIsLoggedInMijnAmsterdam'
import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {mijnAmsterdamSlice} from '@/modules/mijn-amsterdam/slice'
import {mijnAmsterdamUserMenuSection} from '@/modules/mijn-amsterdam/utils/userMenuSection'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const mijnAmsterdamModule = createClientModule({
  reduxConfigs: [
    {
      key: ReduxKey.mijnAmsterdam,
      persistVersion: 0,
      slice: mijnAmsterdamSlice,
    },
  ],
  hiddenInMenu: true,
  linking: {
    [MijnAmsterdamRouteName.settings]: 'mijn-amsterdam/:loginResult',
  },
  name: 'MijnAmsterdamModule',
  requiresFirebaseToken: true,
  slug: ModuleSlug['mijn-amsterdam'],
  userMenuSection: mijnAmsterdamUserMenuSection,
  useIsLoggedIn: () => useIsLoggedInMijnAmsterdam().isLoggedIn,
  loginRoute: [
    ModuleSlug['mijn-amsterdam'],
    {screen: MijnAmsterdamRouteName.settings},
  ],
})
