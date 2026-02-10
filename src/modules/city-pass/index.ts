import {useSelector} from '@/hooks/redux/useSelector'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {
  cityPassSlice,
  CityPassState,
  selectIsCityPassOwnerRegistered,
} from '@/modules/city-pass/slice'
import {logout} from '@/modules/city-pass/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof CityPassState)[] = [
  'isCityPassOwnerRegistered',
  'accessTokenExpiration',
  'refreshTokenExpiration',
  'isAutomaticLogoutAlertDismissed',
]

export const cityPassModule = createClientModule({
  linking: {
    [CityPassRouteName.loginSteps]:
      'stadspas/:loginResult/:accessToken?/:refreshToken?/:errorMessage?/:errorCode?',
  },
  logDimension: PiwikSessionDimension.cityPassModule,
  logout: dispatch => logout(false, dispatch),
  name: 'CityPassModule',
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      slice: cityPassSlice,
      persistVersion: 0,
      persistWhitelist,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['city-pass'],
  useIsLoggedIn: () => useSelector(selectIsCityPassOwnerRegistered),
  loginRoute: {screen: CityPassRouteName.login},
})
