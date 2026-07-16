import {boatChargingSvgIcons} from '@/modules/boat-charging/constants/icons'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  boatChargingSlice,
  type BoatChargingState,
} from '@/modules/boat-charging/slice'
import {logout} from '@/modules/boat-charging/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof BoatChargingState)[] = [
  'selectedBoatChargingPointId',
  'openIdConnectConfig',
  'lastApprovedTermsVersionWhileLoggedIn',
]

export const clientModule = createClientModule({
  logout,
  name: 'BoatChargingModule',
  slug: ModuleSlug['boat-charging'],
  linking: {
    [ModuleSlug['boat-charging']]: ModuleSlug['boat-charging'],
  },
  reduxConfigs: [
    {
      key: ReduxKey.boatCharging,
      persistVersion: 0,
      slice: boatChargingSlice,
      persistWhitelist,
    },
  ],
  icons: boatChargingSvgIcons,
  loginRoute: {screen: BoatChargingRouteName.boatChargingLogin},
})
