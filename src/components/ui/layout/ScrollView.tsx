import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {ReactNode, Ref} from 'react'
import {layoutStyles} from '@/styles/layoutStyles'

export type ScrollViewProps = {
  children: ReactNode
  grow?: boolean
  ref?: Ref<RNScrollView | null>
  withBottomInset?: boolean
} & RNScrollViewProps

export const ScrollView = ({
  ref,
  children,
  grow,
  withBottomInset = false,
  contentContainerStyle,
  style,
  ...scrollViewProps
}: ScrollViewProps) => {
  const insets = useSafeAreaInsets()

  return (
    <RNScrollView
      contentContainerStyle={[
        grow ? layoutStyles.grow : undefined,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps={grow ? 'handled' : undefined}
      ref={ref}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      style={[
        withBottomInset ? {paddingBottom: insets.bottom} : undefined,
        style,
      ]}
      {...scrollViewProps}>
      {children}
    </RNScrollView>
  )
}
