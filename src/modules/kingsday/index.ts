import {kingsdaySvgIcons} from '@/modules/kingsday/constants/icons'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const clientModule = createClientModule({
  name: 'KingsdayModule',
  linking: {
    [ModuleSlug.kingsday]: ModuleSlug.kingsday,
  },
  slug: ModuleSlug.kingsday,
  icons: kingsdaySvgIcons,
  moduleHighlightColor: 'kingsday',
})
