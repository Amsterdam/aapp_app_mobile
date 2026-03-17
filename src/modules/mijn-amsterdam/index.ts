import {
  mijnAmsterdamSlice,
  type MijnAmsterdamState,
} from '@/modules/mijn-amsterdam/slice'
import {logout} from '@/modules/mijn-amsterdam/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof MijnAmsterdamState)[] = [
  'isLoggedIn',
  'shouldShowBanner',
]

export const mijnAmsterdamModule = createClientModule({
  reduxConfigs: [
    {
      key: ReduxKey.mijnAmsterdam,
      persistVersion: 0,
      persistWhitelist,
      slice: mijnAmsterdamSlice,
    },
  ],
  excludeFromHome: true,
  name: 'MijnAmsterdamModule',
  logout: (dispatch, state) => logout(dispatch, state),
  requiresFirebaseToken: true,
  slug: ModuleSlug['mijn-amsterdam'],
  loginRoute: [ModuleSlug.user, {screen: UserRouteName.accounts}],
})
