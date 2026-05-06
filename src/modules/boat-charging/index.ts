import {boatChargingSvgIcons} from '@/modules/boat-charging/constants/icons'
import {boatChargingSlice} from '@/modules/boat-charging/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const boatChargingModule = createClientModule({
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
    },
  ],
  icons: boatChargingSvgIcons,
})
