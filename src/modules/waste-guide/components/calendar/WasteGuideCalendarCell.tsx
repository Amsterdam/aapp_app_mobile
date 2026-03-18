import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import type {PropsWithChildren} from 'react'
import {useThemable} from '@/themes/useThemable'

export const WasteGuideCalendarCell = ({
  children,
  accessibilityLabel,
  emphasis = false,
  size = 'lg',
}: PropsWithChildren<{
  accessibilityLabel?: string
  emphasis?: boolean
  size?: 'md' | 'lg'
}>) => {
  const styles = useThemable(theme => createStyles(theme, size))

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessible={!!children}
      style={[
        styles.cell,
        !children && styles.dayInvisible,
        emphasis && styles.emphasis,
      ]}>
      {children}
    </View>
  )
}

const createStyles = (
  {border, color, size}: Theme,
  paddingBottom: 'md' | 'lg',
) =>
  StyleSheet.create({
    cell: {
      alignItems: 'center',
      height: '100%',
      paddingBottom: size.spacing[paddingBottom],
      width: `${100 / 7}%`,
    },
    emphasis: {
      borderWidth: border.width.xl,
      borderTopWidth: border.width.md,
      borderColor: color.box.border.emphasis,
    },
    dayInvisible: {
      opacity: 0,
    },
  })
