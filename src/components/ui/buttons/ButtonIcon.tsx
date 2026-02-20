import type {ButtonVariant} from '@/components/ui/buttons/Button'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {TestProps} from '@/components/ui/types'
import {Icon, type IconProps} from '@/components/ui/media/Icon'

type Props = {
  icon?: IconProps
  isError?: boolean
  isLoading?: boolean
  variant: ButtonVariant
} & TestProps

export const ButtonIcon = ({
  icon,
  isError,
  isLoading,
  variant,
  testID,
}: Props) => {
  const iconName = getIconName({isError, isLoading, icon})
  const iconColor =
    variant === 'primary'
      ? 'inverse'
      : variant === 'secondaryDestructive'
        ? 'warning'
        : 'link'
  const iconSize = icon?.size ?? 'lg'

  return (
    <Icon
      {...icon}
      color={iconColor}
      name={iconName as SvgIconName}
      size={iconSize}
      testID={`${testID}Icon`}
    />
  )
}

const getIconName = ({
  isError,
  isLoading,
  icon,
}: Pick<Props, 'icon' | 'isError' | 'isLoading'>) => {
  if (isLoading) {
    return 'spinner'
  }

  if (isError) {
    return 'warning'
  }

  return icon?.name
}
