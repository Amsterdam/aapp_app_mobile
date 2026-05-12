import {ReactNode, useMemo} from 'react'
import {StyleSheet, TextProps, TextStyle} from 'react-native'
import type {Emphasis, ParagraphVariants} from '@/themes/tokens/text'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export type PhraseProps = {
  children: ReactNode
  /**
   * Defines the color of the phrase. Maps with the text color tokens.
   */
  color?: keyof Theme['color']['text']
  /**
   * Allows the phrase to convey more emphasis.
   */
  emphasis?: Emphasis
  /**
   * Defines how to shrink the phrase in case the parent container is smaller than the phrase.
   */
  flexShrink?: number
  /**
   * Label used for logging to Piwik and AppInsights.
   */
  'logging-label'?: string
  opacity?: number
  /**
   * Defines the alignment of the text. Maps with the textAlign style prop options.
   */
  textAlign?: TextStyle['textAlign']
  /**
   * Whether the phrase is underlined. Use this for a link only.
   */
  underline?: boolean
  /**
   * Which variation of a phrase to display.
   */
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'> &
  Partial<TestProps>

/**
 * Displays (very) short text phrases.
 * Offers the three sizing variants, and bold text.
 * For sentences, use `Paragraph` instead.
 */
export const Phrase = ({
  children,
  color = 'default',
  emphasis = 'default',
  flexShrink = 1,
  opacity = 1,
  underline = false,
  variant = 'body',
  testID,
  'logging-label': loggingLabel,
  textAlign = 'left',
  ...textProps
}: PhraseProps) => {
  const createdStyles = useMemo(
    () =>
      createStyles({
        color,
        emphasis,
        flexShrink,
        opacity,
        underline,
        variant,
        textAlign,
      }),
    [color, emphasis, flexShrink, opacity, underline, variant, textAlign],
  )
  const styles = useThemable(createdStyles)

  return (
    <AccessibleText
      {...textProps}
      accessibilityLanguage="nl-NL"
      logging-label={loggingLabel}
      style={styles.text}
      testID={testID}>
      {children}
    </AccessibleText>
  )
}

const createStyles =
  ({
    color: textColor,
    emphasis,
    flexShrink,
    opacity,
    underline,
    variant,
    textAlign,
  }: Required<
    Pick<
      PhraseProps,
      | 'color'
      | 'emphasis'
      | 'flexShrink'
      | 'opacity'
      | 'underline'
      | 'variant'
      | 'textAlign'
    >
  >) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink,
        color: color.text[textColor],
        fontFamily: text.fontFamily[emphasis === 'strong' ? 'bold' : 'regular'],
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant],
        opacity,
        textDecorationLine: underline ? 'underline' : 'none',
        textAlign,
      },
    })
