import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color?: keyof Theme['color']['box']['border']
  height?: keyof Theme['border']['width']
}

export const Divider = ({color = 'default', height = 'sm'}: Props) => {
  const styles = useThemable(createStyles(color, height))

  return <View style={styles.divider} />
}

const createStyles =
  (
    color: keyof Theme['color']['box']['border'],
    height: keyof Theme['border']['width'],
  ) =>
  ({color: themeColor, border}: Theme) =>
    StyleSheet.create({
      divider: {
        height: border.width[height],
        backgroundColor: themeColor.box.border[color],
      },
    })
