import type {TestProps} from '@/components/ui/types'
import type {CarouselItemButton} from '@/modules/onboarding/types'
import {Button} from '@/components/ui/buttons/Button'

export const CarouselRenderItemContentButton = ({
  label,
  external,
  onPress,
  useOnPress,
  testID,
}: CarouselItemButton & TestProps) => (
  <Button
    icon={external ? {name: 'link-external', size: 'md'} : undefined}
    label={label}
    onPress={useOnPress?.() ?? onPress}
    testID={`${testID}ContentButton`}
    variant="tertiary"
  />
)
