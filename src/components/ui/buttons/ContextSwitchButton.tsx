import {Button, type ButtonProps} from '@/components/ui/buttons/Button'

type Props = Pick<
  ButtonProps,
  | 'accessibilityHint'
  | 'accessibilityLabel'
  | 'noPadding'
  | 'onPress'
  | 'label'
  | 'testID'
>

export const ContextSwitchButton = (props: Props) => (
  <Button
    icon={{name: 'chevron-down', size: 'md'}}
    isReverseOrder
    variant="tertiary"
    {...props}
  />
)
