import {type ReactNode} from 'react'
import {View, StyleSheet} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children?: ReactNode
}

export const BackgroundComponent = ({children}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View
      accessible={false}
      style={styles.container}>
      {children}
    </View>
  )
}

const createStyles = ({color, border}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.bottomSheet.background,
      borderTopLeftRadius: border.radius.lg,
      borderTopRightRadius: border.radius.lg,
      flex: 1,
      overflow: 'hidden',
    },
  })
