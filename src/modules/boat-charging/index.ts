import {boatChargingSvgIcons} from '@/modules/boat-charging/icons'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const boatChargingModule = createClientModule({
  icons: boatChargingSvgIcons,
  name: 'BoatChargingModule',
  slug: ModuleSlug['boat-charging'],
})
