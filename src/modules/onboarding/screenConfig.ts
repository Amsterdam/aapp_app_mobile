import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  OnboardingRouteName,
  ModuleStackParams,
} from '@/modules/onboarding/routes'
import {OnboardingScreen} from '@/modules/onboarding/screens/Onboarding.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  OnboardingRouteName
> = {
  [OnboardingRouteName.onboarding]: {
    component: OnboardingScreen,
    name: OnboardingRouteName.onboarding,
    options: {
      headerShown: false,
    },
  },
}
