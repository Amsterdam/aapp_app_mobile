import {useMemo} from 'react'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Badge} from '@/components/ui/feedback/Badge'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {useTheme} from '@/themes/useTheme'

type ModuleButtonContentProps = {
  disabled: boolean | undefined
  iconPath?: string
  label: string
  variant: ButtonVariants
} & TestProps

const ModuleButtonContent = ({
  disabled,
  iconPath,
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

    return 'default'
  }, [disabled, variant])

  return (
    <Row gutter="sm">
      <Row gutter="md">
        {!!iconPath && (
          <Icon
            color={color}
            path={iconPath}
            size="lgx"
            testID={`${testID}Icon`}
          />
        )}
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
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  background,
  disabled,
  iconPath,
  label,
  slug,
  testID,
  variant = 'tertiary',
}: ModuleButtonProps) => {
  const navigation = useNavigation<HomeRouteName>()

  const {color} = useTheme()

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
        iconPath={iconPath}
        label={label}
        testID={testID}
        variant={variant}
      />
    </Pressable>
  )
}
