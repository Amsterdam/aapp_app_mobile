import {Screen} from '@/components/features/screen/Screen'
import {OnboardingCarousel} from '@/modules/onboarding/components/OnboardingCarousel'
import {OnboardingScreenHeader} from '@/modules/onboarding/components/OnboardingScreenHeader'

export const OnboardingScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={<OnboardingScreenHeader />}
    testID="OnboardingScreen"
    withLeftInset={false}
    withRightInset={false}
    withTopInset>
    <OnboardingCarousel />
  </Screen>
)
