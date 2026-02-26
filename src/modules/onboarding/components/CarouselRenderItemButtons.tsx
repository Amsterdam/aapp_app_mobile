import type {TestProps} from '@/components/ui/types'
import type {CarouselItemVariant} from '@/modules/onboarding/types'
import {Button} from '@/components/ui/buttons/Button'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {Track} from '@/components/ui/layout/Track'
import {useCloseOnboarding} from '@/modules/onboarding/hooks/useCloseOnboarding'

type Props = {
  button: CarouselItemVariant['button']
  isLastItem: boolean
  isPortrait: boolean
  onPressNextButton: () => void
} & TestProps

const CarouselRenderItemButton = ({
  button,
  testID,
  isPortrait,
}: Pick<Props, 'button' | 'testID' | 'isPortrait'>) =>
  !!button &&
  (button.digid ? (
    <DigiDButton
      onPress={button.useOnPress?.() ?? button.onPress}
      testID={`${testID}Button`}
    />
  ) : (
    <Button
      flex={isPortrait ? undefined : 1}
      label={button.label}
      onPress={button.useOnPress?.() ?? button.onPress}
      testID={`${testID}Button`}
    />
  ))

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
      {!!button && (
        <CarouselRenderItemButton
          button={button}
          isPortrait={isPortrait}
          key={typeof button.useOnPress}
          testID={testID}
        />
      )}
      <Button
        flex={isPortrait ? undefined : 1}
        label={isLastItem ? 'Ga naar startscherm' : 'Volgende'}
        onPress={isLastItem ? closeOnboarding : onPressNextButton}
        testID={`${testID}NextButton`}
        variant={button ? 'secondary' : 'primary'}
      />
    </Track>
  )
}
