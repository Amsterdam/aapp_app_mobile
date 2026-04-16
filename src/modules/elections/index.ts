import {electionsSvgIcons} from '@/modules/elections/constants/icons'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const electionsModule = createClientModule({
  name: 'ElectionsModule',
  linking: {
    [ModuleSlug.elections]: ModuleSlug.elections,
  },
  slug: ModuleSlug.elections,
  icons: electionsSvgIcons,
})
