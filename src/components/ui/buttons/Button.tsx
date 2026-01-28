import {useCallback, useState} from 'react'
import {FlexStyle, GestureResponderEvent, StyleSheet, View} from 'react-native'
import {
  PressableBaseProps,
  PressableBase,
} from '@/components/ui/buttons/PressableBase'
import {config} from '@/components/ui/config'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {IconSize} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'secondaryDestructive'

export type ButtonProps = {
  ellipsizeMode?: 'head' | 'tail' | 'middle' | 'clip'
  iconName?: SvgIconName
  iconSize?: keyof typeof IconSize
  isError?: boolean
  isLoading?: boolean
  label?: string
  noPadding?: boolean
  noPaddingHorizontal?: boolean
  noPaddingVertical?: boolean
  numberOfLines?: number
  small?: boolean
  underline?: boolean
  variant?: ButtonVariant
} & Omit<PressableBaseProps, 'style' | 'children'> &
  FlexStyle

const defaultVariant = 'primary'

export const Button = ({
  ellipsizeMode,
  iconName: iconNameInput,
  iconSize = 'lg',
  isError,
  isLoading,
  label,
  noPadding = false,
  noPaddingHorizontal = false,
  noPaddingVertical = false,
  numberOfLines,
  small,
  testID,
  underline = false,
  variant = defaultVariant,
  ...pressableProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const theme = useTheme()
  const styles = createStyles(
    theme,
    {small, variant},
    isPressed,
    noPadding,
    noPaddingHorizontal,
    noPaddingVertical,
    underline,
  )
  const {onPressIn, onPressOut} = pressableProps

  const mergeOnPressIn = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(true)
      onPressIn?.(e)
    },
    [onPressIn],
  )

  const mergeOnPressOut = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(false)
      onPressOut?.(e)
    },
    [onPressOut],
  )

  const iconName = isLoading ? 'spinner' : isError ? 'warning' : iconNameInput
  const isExternalLink = iconName === 'link-external'

  return (
    <PressableBase
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      disabled={pressableProps.disabled || isLoading}
      hitSlop={
        noPadding || noPaddingVertical
          ? (config.minTouchSize - theme.text.lineHeight.body) / 2
          : undefined
      }
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      testID={testID}
      {...pressableProps}>
      <Row
        gutter="sm"
        reverse={isExternalLink}
        valign={variant === 'tertiary' ? 'start' : 'center'}>
        {!!iconName && (
          <View style={variant === 'tertiary' ? styles.iconWrapper : undefined}>
            <Icon
              color={
                variant === 'primary'
                  ? 'inverse'
                  : variant === 'secondaryDestructive'
                    ? 'warning'
                    : 'link'
              }
              name={iconName}
              size={iconSize}
              testID={`${testID}Icon`}
            />
          </View>
        )}
        {!!label && (
          <AccessibleText
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={styles.label}
            testID={`${testID}Label`}>
            {label}
          </AccessibleText>
        )}
      </Row>
    </PressableBase>
  )
}

const getBorderColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].border

const getLabelColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].label

const getBackgroundColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].background

const LINE_HEIGHT_CORRECTION = 6

const createStyles = (
  {border, color, text, size}: Theme,
  {small, variant}: Partial<ButtonProps>,
  isPressed: boolean,
  noPadding: boolean,
  noPaddingHorizontal: boolean,
  noPaddingVertical: boolean,
  underline?: boolean,
) => {
  const buttonHeight = config.buttonHeight
  const borderWidth =
    variant === 'tertiary'
      ? 0
      : border.width[variant === 'secondary' && isPressed ? 'lg' : 'md']
  const labelFontSize = text.fontSize[small ? 'small' : 'body']
  const labelLineHeight = text.lineHeight[small ? 'small' : 'body']

  const paddingHorizontal =
    noPadding || noPaddingHorizontal
      ? 0
      : size.spacing.md + 2 + border.width.md - borderWidth

  const paddingVertical =
    noPadding || noPaddingVertical
      ? 0
      : (buttonHeight - labelLineHeight - 2 * borderWidth) / 2

  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexShrink: 1,
      paddingHorizontal,
      paddingVertical,
      backgroundColor: getBackgroundColor(color, isPressed, variant),
      borderColor: getBorderColor(color, isPressed, variant),
      borderStyle: 'solid',
      borderWidth,
    },
    iconWrapper: {
      marginTop: LINE_HEIGHT_CORRECTION, // Only applied to tertiary buttons
    },
    // TODO Use `Phrase` instead, after merging line height branch
    label: {
      flexShrink: 1,
      color: getLabelColor(color, isPressed, variant),
      fontFamily: text.fontFamily.regular,
      fontSize: labelFontSize,
      lineHeight: labelLineHeight,
      textDecorationLine: underline ? 'underline' : 'none',
    },
  })
}
