import type {TestProps} from '@/components/ui/types'
import type {CarouselItemButton} from '@/modules/onboarding/types'
import {Button, type ButtonProps} from '@/components/ui/buttons/Button'

export const CarouselRenderItemContentButton = ({
  label,
  external,
  onPress,
  useOnPress,
  testID,
  ...rest
}: CarouselItemButton & TestProps & ButtonProps) => (
  <Button
    {...rest}
    icon={external ? {name: 'link-external', size: 'md'} : undefined}
    label={label}
    noPadding
    onPress={useOnPress?.() ?? onPress}
    testID={`${testID}ContentButton`}
    variant="tertiary"
  />
)
