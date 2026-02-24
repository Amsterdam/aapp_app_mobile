import type {TestProps} from '@/components/ui/types'
import type {CarouselItem} from '@/modules/onboarding/types'
import {Button} from '@/components/ui/buttons/Button'
import {Track} from '@/components/ui/layout/Track'
import {useCloseOnboarding} from '@/modules/onboarding/hooks/useCloseOnboarding'

type Props = {
  button: CarouselItem['button']
  isLastItem: boolean
  isPortrait: boolean
  onPressNextButton: () => void
} & TestProps

export const CarouselRenderItemButtons = ({
  isPortrait,
  button,
  isLastItem,
  testID,
  onPressNextButton,
}: Props) => {
  const closeOnboarding = useCloseOnboarding()

  return (
    <Track
      gutter={isPortrait ? 'md' : 'lg'}
      shrink={0}>
      <Button
        flex={isPortrait ? undefined : 1}
        label={button.label}
        onPress={button.onPress}
        testID={`${testID}Button`}
      />
      <Button
        flex={isPortrait ? undefined : 1}
        label={isLastItem ? 'Aan de slag' : 'Volgende'}
        onPress={isLastItem ? closeOnboarding : onPressNextButton}
        testID={`${testID}NextButton`}
        variant="secondary"
      />
    </Track>
  )
}
