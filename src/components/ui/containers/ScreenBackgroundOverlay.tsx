import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

enum Size {
  lg = '25%',
  md = '50%',
  sm = '75%',
}

export type ScreenBackgroundOverlayProps = {
  /**
   * The color of the overlay. If not provided, the default color will be used.
   */
  color?: keyof Theme['color']['screen']['background']
  /**
   * The top position of the overlay. If not provided, the overlay will cover the entire screen.
   */
  size?: keyof typeof Size
}

export const ScreenBackgroundOverlay = ({
  color = 'default',
  size = 'md',
}: ScreenBackgroundOverlayProps) => {
  const styles = useThemable(createStyles(color, size))

  return <View style={styles.container} />
}

const createStyles =
  (
    color: keyof Theme['color']['screen']['background'],
    size?: keyof typeof Size,
  ) =>
  ({color: themeColor}: Theme) =>
    StyleSheet.create({
      container: {
        position: 'absolute',
        top: Size[size ?? 'sm'],
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: themeColor.screen.background[color],
        zIndex: -1,
      },
    })
