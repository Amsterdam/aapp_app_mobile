import {useMemo} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Badge} from '@/components/ui/feedback/Badge'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'

type ModuleButtonContentProps = {
  disabled: boolean | undefined
  iconName: SvgIconName
  label: string
  variant: ButtonVariants
} & TestProps

const ModuleButtonContent = ({
  disabled,
  iconName,
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
        {!!iconName && (
          <Icon
            color={color}
            name={iconName}
            size="lg"
            testID={`${testID}Icon`}
          />
        )}
        <Title
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
  disabled?: boolean
  iconName: SvgIconName
  label: string
  slug: ModuleSlug
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  disabled,
  iconName,
  label,
  slug,
  testID,
  variant = 'tertiary',
}: ModuleButtonProps) => {
  const navigation = useNavigation<HomeRouteName>()

  const button = useMemo(
    () => (
      <ModuleButtonContent
        disabled={disabled}
        iconName={iconName}
        label={label}
        testID={testID}
        variant={variant}
      />
    ),
    [disabled, iconName, label, testID, variant],
  )

  return (
    <Pressable
      inset="md"
      onPress={() => {
        navigation.navigate(slug)
      }}
      testID={`${testID}Button`}
      variant={variant}>
      {button}
    </Pressable>
  )
}
