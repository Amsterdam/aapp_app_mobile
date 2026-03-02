import {onboardingSlice} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createCoreModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const onboardingModule = createCoreModule({
  name: 'OnboardingModule',
  reduxConfigs: [
    {
      key: ReduxKey.onboarding,
      persistVersion: 0,
      slice: onboardingSlice,
      migrations: {
        0: () => ({
          shouldShowOnboarding: true,
          _persist: {version: 0, rehydrated: true},
        }),
      },
    },
  ],
  slug: ModuleSlug.onboarding,
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
})
