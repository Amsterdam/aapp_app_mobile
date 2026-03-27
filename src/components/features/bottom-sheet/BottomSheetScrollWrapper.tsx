import {StyleSheet} from 'react-native'
import type {ReactNode} from 'react'
import {ScrollView} from '@/components/ui/layout/ScrollView'

export const BottomSheetScrollWrapper = ({children}: {children: ReactNode}) => {
  const styles = createStyles()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      style={styles.scroll}>
      {children}
    </ScrollView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 0,
    },
    scroll: {
      flexGrow: 1,
      minHeight: 0,
    },
  })
