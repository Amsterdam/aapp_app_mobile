import {StyleSheet} from 'react-native'
import type {ReactNode} from 'react'
import {ScrollView} from '@/components/ui/layout/ScrollView'

export const BottomSheetScrollWrapper = ({
  children,
  maxHeight,
}: {
  children: ReactNode
  maxHeight?: number
}) => {
  const styles = createStyles()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      style={maxHeight ? {maxHeight} : undefined}>
      {children}
    </ScrollView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
    },
  })
