import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const boatChargingModule = createClientModule({
  name: 'BoatChargingModule',
  slug: ModuleSlug['boat-charging'],
})
