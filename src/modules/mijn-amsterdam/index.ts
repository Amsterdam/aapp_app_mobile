import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {resolvePathFromNotification} from '@/modules/mijn-amsterdam/notifications/resolvePathFromNotification'
import {
  mijnAmsterdamSlice,
  type MijnAmsterdamState,
} from '@/modules/mijn-amsterdam/slice'
import {logout} from '@/modules/mijn-amsterdam/utils/logout'
import {UserRouteName} from '@/modules/user/routes'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof MijnAmsterdamState)[] = [
  'isLoggedIn',
  'shouldShowBanner',
]

export const mijnAmsterdamModule = createClientModule({
  excludeFromHome: true,
  loginRoute: [ModuleSlug.user, {screen: UserRouteName.accounts}],
  logout,
  name: 'MijnAmsterdamModule',
  reduxConfigs: [
    {
      key: ReduxKey.mijnAmsterdam,
      persistVersion: 0,
      persistWhitelist,
      slice: mijnAmsterdamSlice,
    },
  ],
  resolvePathFromNotification,
  slug: ModuleSlug['mijn-amsterdam'],
})
