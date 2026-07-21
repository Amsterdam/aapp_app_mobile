import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

enum PositionFromTop {
  lg = '75%',
  md = '50%',
  sm = '25%',
}

export type ScreenBackgroundOverlayProps = {
  color?: keyof Theme['color']['screen']['background']
  /**
   * The position from the top of the screen where the overlay should start. The overlay will cover the rest of the screen from that point downwards. Defaults to 'md' (50% of the screen height).
   */
  positionFromTop?: keyof typeof PositionFromTop
}

export const ScreenBackgroundOverlay = ({
  color = 'default',
  positionFromTop = 'md',
}: ScreenBackgroundOverlayProps) => {
  const styles = useThemable(createStyles(color, positionFromTop))

  return <View style={styles.container} />
}

const createStyles =
  (
    color: keyof Theme['color']['screen']['background'],
    positionFromTop: keyof typeof PositionFromTop,
  ) =>
  ({color: themeColor}: Theme) =>
    StyleSheet.create({
      container: {
        position: 'absolute',
        top: PositionFromTop[positionFromTop],
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: themeColor.screen.background[color],
        zIndex: -1,
      },
    })
