import {electionsSvgIcons} from '@/modules/elections/constants/icons'
import {ElectionsRouteName} from '@/modules/elections/routes'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const electionsModule = createClientModule({
  name: 'ElectionsModule',
  slug: ModuleSlug.elections,
  icons: electionsSvgIcons,
  linking: {
    [ElectionsRouteName.elections]: {
      path: `/${ModuleSlug.elections}`,
    },
  },
})
