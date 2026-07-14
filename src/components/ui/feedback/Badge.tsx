import {type AccessibilityProps, StyleSheet, View} from 'react-native'
import type {Device} from '@/providers/device.context'
import type {Theme} from '@/themes/themes'
import type {OmitUndefined} from '@/types/undefined'
import {Row} from '@/components/ui/layout/Row'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useThemable} from '@/themes/useThemable'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  color?: keyof Theme['color']['badge']['background']
  /**
   * The value to display in the badge.
   */
  value?: number | string
  /**
   * Which variant of the badge to display.
   */
  variant?: 'default' | 'on-icon' | 'small' | 'extraSmall'
} & Pick<
  AccessibilityProps,
  'accessibilityLabel' | 'accessibilityLanguage' | 'accessible'
> &
  TestProps

export const Badge = ({
  accessible,
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  color,
  testID,
  value,
  variant = 'default',
}: BadgeProps) => {
  const {fontScale} = useDeviceContext()
  const styles = useThemable(createStyles(color, fontScale, variant, value))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <AccessibleText
          accessibilityLabel={accessibilityLabel}
          accessibilityLanguage={accessibilityLanguage}
          accessible={accessible ?? variant !== 'on-icon'}
          numberOfLines={1}
          style={styles.text}
          testID={testID}>
          {!!value && typeof value === 'number' ? formatNumber(value) : value}
        </AccessibleText>
      </View>
    </Row>
  )
}

const MARGIN_SINGLE_DIGIT = 1.2
const MARGIN_DOUBLE_DIGIT = 1.4

const createStyles =
  (
    color: BadgeProps['color'] = 'warning',
    fontScale: Device['fontScale'],
    variant: OmitUndefined<BadgeProps['variant']>,
    value: number | string = 0,
  ) =>
  ({color: themeColor, text, border}: Theme) => {
    const fontSize =
      text.fontSize[
        variant === 'extraSmall'
          ? 'extraSmall'
          : variant === 'small'
            ? 'small'
            : 'body'
      ]
    const scaleFactor =
      variant === 'on-icon' ? 1 + (fontScale - 1) / 2 : fontScale
    const isDoubleDigitValue = typeof value === 'number' ? value > 9 : false
    const marginFactor = isDoubleDigitValue
      ? MARGIN_DOUBLE_DIGIT
      : MARGIN_SINGLE_DIGIT

    const scaledDiameter = marginFactor * scaleFactor * fontSize

    const scaledFontSize = (fontSize / fontScale) * scaleFactor

    return StyleSheet.create({
      circle: {
        height: scaledDiameter,
        width: scaledDiameter,
        borderRadius: scaledDiameter / 2,
        backgroundColor: themeColor.badge.background[color],
        borderWidth: variant === 'on-icon' ? border.width.sm : 0,
        borderColor: themeColor.badge.border,
      },
      text: {
        fontFamily: text.fontFamily.bold,
        fontSize: value === '!' ? scaledFontSize * 0.8 : scaledFontSize,
        lineHeight: scaledFontSize * 1.28,
        bottom: isDoubleDigitValue ? 0 : fontScale, // for some reason vertical correction is needed only for single digit
        color: themeColor.text.inverse,
        textAlign: 'center',
      },
    })
  }
