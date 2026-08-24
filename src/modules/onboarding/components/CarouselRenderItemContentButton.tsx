import type {TestProps} from '@/components/ui/types'
import type {CarouselItemButton} from '@/modules/onboarding/types'
import {Button, type ButtonProps} from '@/components/ui/buttons/Button'

type Props = CarouselItemButton & TestProps & ButtonProps
export const CarouselRenderItemContentButton = ({
  label,
  external,
  onPress,
  useOnPress,
  testID,
  ...rest
}: Props) => (
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
