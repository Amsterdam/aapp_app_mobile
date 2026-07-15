import {ModuleSlug} from '@/modules/slugs'
import {createCoreModule} from '@/modules/utils/createModule'

export const coreModule = createCoreModule({
  name: 'HomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.home,
})
