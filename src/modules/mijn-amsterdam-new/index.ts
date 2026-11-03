import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {resolvePathFromNotification} from '@/modules/mijn-amsterdam-new/notifications/resolvePathFromNotification'
import {
  mijnAmsterdamNewSlice,
  type MijnAmsterdamState,
} from '@/modules/mijn-amsterdam-new/slice'
import {logout} from '@/modules/mijn-amsterdam-new/utils/logout'
import {UserRouteName} from '@/modules/user/routes'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof MijnAmsterdamState)[] = [
  'isLoggedIn',
  'shouldShowBanner',
]

export const clientModule = createClientModule({
  excludeFromHome: true,
  loginRoute: [ModuleSlug.user, {screen: UserRouteName.accounts}],
  logout,
  name: 'MijnAmsterdamNewModule',
  reduxConfigs: [
    {
      key: ReduxKey.mijnAmsterdamNew,
      persistVersion: 0,
      persistWhitelist,
      slice: mijnAmsterdamNewSlice,
    },
  ],
  resolvePathFromNotification,
  slug: ModuleSlug['mijn-amsterdam-new'],
})
