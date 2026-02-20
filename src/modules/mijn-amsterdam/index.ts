import {mijnAmsterdamSlice} from '@/modules/mijn-amsterdam/slice'
import {logout} from '@/modules/mijn-amsterdam/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
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
  excludeFromHome: true,
  name: 'MijnAmsterdamModule',
  logout: (dispatch, _state) => logout(dispatch),
  requiresFirebaseToken: true,
  slug: ModuleSlug['mijn-amsterdam'],
  loginRoute: [ModuleSlug.user, {screen: UserRouteName.accounts}],
})
