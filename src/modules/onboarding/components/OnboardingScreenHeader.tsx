import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useCloseOnboarding} from '@/modules/onboarding/hooks/useCloseOnboarding'

export const OnboardingScreenHeader = () => {
  const closeOnboarding = useCloseOnboarding()
  const {isPortrait} = useDeviceContext()

  return (
    <HorizontalSafeArea>
      <Box
        insetHorizontal={isPortrait ? 'md' : 'xl'}
        insetTop="md">
        <Row align="end">
          <IconButton
            accessibilityLabel="Sluit onboarding"
            icon={
              <Icon
                name="close"
                size="lg"
                testID="OnboardingCloseIcon"
              />
            }
            onPress={closeOnboarding}
            testID="OnboardingCloseButton"
          />
        </Row>
      </Box>
    </HorizontalSafeArea>
  )
}
