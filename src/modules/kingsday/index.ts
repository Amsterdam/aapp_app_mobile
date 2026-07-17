import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {kingsdaySvgIcons} from '@/modules/kingsday/constants/icons'
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
