import {electionsSvgIcons} from '@/modules/elections/constants/icons'
import {electionsSlice} from '@/modules/elections/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const module = createClientModule({
  name: 'ElectionsModule',
  linking: {
    [ModuleSlug.elections]: ModuleSlug.elections,
  },
  slug: ModuleSlug.elections,
  icons: electionsSvgIcons,
  reduxConfigs: [
    {
      key: ReduxKey.elections,
      slice: electionsSlice,
    },
  ],
})
