import {kingsdaySvgIcons} from '@/modules/kingsday/constants/icons'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const kingsdayModule = createClientModule({
  name: 'KingsdayModule',
  slug: ModuleSlug.kingsday,
  icons: kingsdaySvgIcons,
  moduleHighlightColor: 'kingsday',
})
