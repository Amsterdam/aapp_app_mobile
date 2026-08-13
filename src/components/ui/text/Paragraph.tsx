import {ReactNode, useMemo} from 'react'
import {StyleSheet, TextProps, TextStyle} from 'react-native'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {ColorTokens} from '@/themes/tokens/color-light'
import {ParagraphVariants} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  /**
   * Provides an inverse text color to allow a paragraph on a dark background.
   */
  color?: keyof ColorTokens['text']
  /**
   * Defines the alignment of the text. Maps with the textAlign style prop options.
   */
  textAlign?: TextStyle['textAlign']
  /**
   * Which variation of a paragraph to display.
   */
  variant?: ParagraphVariants
} & Omit<TextProps, 'style' | 'testID'> &
  Partial<TestProps>

export const Paragraph = ({
  children,
  color = 'default',
  textAlign = 'left',
  variant = 'body',
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, textAlign, variant}),
    [color, textAlign, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <AccessibleText
      accessibilityLanguage="nl-NL"
      accessibilityRole={color === 'warning' ? 'alert' : 'none'}
      style={styles.text}
      {...textProps}>
      {children}
    </AccessibleText>
  )
}

const createStyles =
  ({
    color: textColor,
    textAlign,
    variant,
  }: Required<Pick<Props, 'color' | 'textAlign' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontFamily.regular,
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant],
        textAlign,
      },
    })
