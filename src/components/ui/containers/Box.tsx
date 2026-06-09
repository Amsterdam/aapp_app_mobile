import {ReactNode, memo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {layoutStyles} from '@/styles/layoutStyles'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

export type BoxProps = {
  borderColor?: keyof Theme['color']['box']['border']
  borderStyle?: 'dashed' | 'dotted' | 'solid'
  borderWidth?: keyof Theme['border']['width']
  children: ReactNode
  /**
   * Whether the box grows to fill its parent container.
   */
  grow?: boolean
  /**
   * The amount of inner spacing.
   */
  inset?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the end of ltr
   */
  insetBottom?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the left and right.
   */
  insetHorizontal?: keyof SpacingTokens
  insetLeft?: keyof SpacingTokens
  insetRight?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the start of ltr
   */
  insetTop?: keyof SpacingTokens
  /**
   * The amount of inner spacing at the top and bottom.
   */
  insetVertical?: keyof SpacingTokens
  shrink?: number
  /**
   * Whether the box has a background color, setting it apart from its surroundings.
   * default: full transparent
   * distinct: In light mode, it is white. Only to be used when the box covers another color, like on light grey (settings) screens or in the navigation header.
   * cityPass: for use in city-pass module
   * primary: for primary color boxes
   */
  variant?: keyof Theme['color']['box']['background']
} & Omit<ViewProps, 'style'>

/**
 * Visually groups its content.
 * Allows to set insets and a background colour.
 */
export const Box = memo(
  ({
    borderColor,
    borderStyle,
    borderWidth,
    children,
    grow,
    inset = 'md',
    insetHorizontal,
    insetLeft,
    insetRight,
    insetVertical,
    insetTop,
    insetBottom,
    shrink,
    variant,
    ...viewProps
  }: BoxProps) => {
    const styles = useThemable(
      createStyles({
        borderColor,
        borderStyle,
        borderWidth,
        inset,
        insetHorizontal,
        insetLeft,
        insetRight,
        insetTop,
        insetVertical,
        insetBottom,
        shrink,
        variant,
      }),
    )

    return (
      <View
        style={[styles.box, grow && layoutStyles.grow]}
        {...viewProps}>
        {children}
      </View>
    )
  },
)

const createStyles =
  ({
    borderColor,
    borderStyle,
    borderWidth,
    inset,
    insetHorizontal,
    insetLeft,
    insetRight,
    insetTop,
    insetVertical,
    insetBottom,
    shrink,
    variant = 'default',
  }: Partial<BoxProps>) =>
  ({border, color, size}: Theme) =>
    StyleSheet.create({
      box: {
        flexShrink: shrink,
        backgroundColor: color.box.background[variant],
        borderColor: borderColor ? color.box.border[borderColor] : undefined,
        borderStyle,
        borderWidth: borderWidth ? border.width[borderWidth] : undefined,
        padding:
          inset &&
          !insetHorizontal &&
          !insetLeft &&
          !insetRight &&
          !insetTop &&
          !insetBottom &&
          !insetVertical
            ? size.spacing[inset]
            : 0,
        paddingLeft: insetLeft ? size.spacing[insetLeft] : undefined,
        paddingRight: insetRight ? size.spacing[insetRight] : undefined,
        paddingHorizontal: insetHorizontal
          ? size.spacing[insetHorizontal]
          : undefined,
        paddingTop: insetTop && size.spacing[insetTop],
        paddingBottom: insetBottom && size.spacing[insetBottom],
        paddingVertical: insetVertical && size.spacing[insetVertical],
      },
    })
