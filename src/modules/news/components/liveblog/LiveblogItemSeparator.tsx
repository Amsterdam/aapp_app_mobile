import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const LiveblogItemSeparator = () => {
  const styles = useThemable(createStyles)

  return <View style={styles.separator} />
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    separator: {
      backgroundColor: theme.color.box.border.default,
      height: theme.size.spacing.xs,
      marginVertical: theme.size.spacing.md,
    },
  })
