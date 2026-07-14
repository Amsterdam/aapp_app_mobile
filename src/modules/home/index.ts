import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createCoreModule} from '@/modules/utils/createModule'

export const homeModule = createCoreModule({
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
