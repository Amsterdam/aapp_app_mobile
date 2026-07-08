import {useMemo, type ReactNode} from 'react'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Badge} from '@/components/ui/feedback/Badge'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {moduleIcons} from '@/modules/generated/moduleIcons.generated'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {useTheme} from '@/themes/useTheme'

type ModuleButtonContentProps = {
  disabled: boolean | undefined
  label: string
  titleColor?: keyof Theme['color']['text']
  variant: ButtonVariants
} & Or<{iconPath?: string}, {Icon?: ReactNode}> &
  TestProps

const ModuleButtonContent = ({
  disabled,
  iconPath,
  Icon: CustomIcon,
  titleColor,
  label,
  testID,
  variant,
}: ModuleButtonContentProps) => {
  const color = useMemo(() => {
    if (disabled) {
      return 'secondary'
    }

    if (variant === 'primary') {
      return 'inverse'
    }

    if (titleColor) {
      return titleColor
    }

    return 'default'
  }, [disabled, variant, titleColor])

  return (
    <Row gutter="sm">
      <Row gutter="md">
        {CustomIcon ||
          (!!iconPath && (
            <Icon
              color={color}
              path={iconPath}
              size="lgx"
              testID={`${testID}Icon`}
            />
          ))}
        <Title
          accessible={false}
          color={color}
          level="h5"
          text={label}
        />
      </Row>
      {!!disabled && (
        <Badge
          accessibilityLabel="Dit onderdeel werkt nu niet."
          color="disabled"
          testID={`${testID}Badge`}
          value="!"
          variant="small"
        />
      )}
    </Row>
  )
}

type ButtonVariants = 'primary' | 'tertiary'

type ModuleButtonProps = {
  background?: keyof Theme['color']['module']['highlight']
  disabled?: boolean
  iconPath?: string
  label: string
  slug: ModuleSlug
  titleColor?: keyof Theme['color']['text']
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  background,
  titleColor,
  disabled,
  iconPath,
  label,
  slug,
  testID,
  variant = 'tertiary',
}: ModuleButtonProps) => {
  const navigation = useNavigation<HomeRouteName>()
  const CustomIcon = moduleIcons[slug as keyof typeof moduleIcons]

  const {color} = useTheme()

  const iconProps = CustomIcon
    ? {Icon: <CustomIcon />}
    : ({iconPath} satisfies Partial<ModuleButtonContentProps>)

  return (
    <Pressable
      backgroundColor={
        background ? color.module.highlight[background] : undefined
      }
      inset="md"
      onPress={() => {
        navigation.navigate(slug)
      }}
      testID={`${testID}Button`}
      variant={variant}>
      <ModuleButtonContent
        disabled={disabled}
        label={label}
        testID={testID}
        titleColor={titleColor}
        variant={variant}
        {...iconProps}
      />
    </Pressable>
  )
}
