import {View, StyleSheet} from 'react-native'
import type {LogProps} from '@/processes/piwik/types'
import type {Theme} from '@/themes/themes'
import type {ReactNode, Ref} from 'react'
import {
  PressableBase,
  type PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Box, type BoxProps} from '@/components/ui/containers/Box'
import {type TestProps} from '@/components/ui/types'
import {useThemable} from '@/themes/useThemable'

type PressableVariant =
  | 'primary'
  | 'tertiary'
  | 'transparent'
  | 'transparentInverse'

export type PressableProps = {
  border?: boolean
  children: ReactNode
  flex?: number
  'logging-label'?: string
  ref?: Ref<View>
  variant?: PressableVariant
} & PressableBaseProps &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'> &
  LogProps &
  TestProps

/**
 * Used to build other interactive components, do not use on its own.
 * This is a replacement for the React Native Pressable component, with added Box properties.
 */
export const Pressable = ({
  ref,
  children,
  inset = 'no',
  insetHorizontal,
  insetVertical,
  variant = 'tertiary',
  flex,
  border = false,
  ...pressableProps
}: PressableProps) => {
  const styles = useThemable(createStyles(variant, flex))

  return (
    <PressableBase
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      ref={ref}
      style={({pressed}) => [
        styles.button,
        pressed &&
          pressableProps.accessibilityRole !== 'checkbox' &&
          styles.pressed,
        !!border && styles.border,
      ]}
      {...pressableProps}>
      <Box
        inset={inset}
        insetHorizontal={insetHorizontal}
        insetVertical={insetVertical}>
        {children}
      </Box>
    </PressableBase>
  )
}

const createStyles =
  (variant: PressableVariant, flex?: number) =>
  ({color, border}: Theme) =>
    StyleSheet.create({
      button: {
        flex,
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].default.background
            : undefined,
      },
      pressed: {
        backgroundColor:
          variant !== 'transparent'
            ? color.pressable[variant].pressed.background
            : undefined,
      },
      border: {
        borderWidth: border.width.md,
        borderColor: color.topTaskButton.border,
      },
    })
