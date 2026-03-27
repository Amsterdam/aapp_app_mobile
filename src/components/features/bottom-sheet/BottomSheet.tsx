import {useIsFocused} from '@react-navigation/native'
import {useEffect, useMemo, useState, type FC, type ReactNode} from 'react'
import {StyleSheet, View, Platform, useWindowDimensions} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BackgroundComponent} from '@/components/features/bottom-sheet/BackgroundComponent'
import {BottomSheetBackdrop} from '@/components/features/bottom-sheet/BottomSheetBackdrop'
import {BottomSheetContainer} from '@/components/features/bottom-sheet/BottomSheetContainer'
import {BottomSheetHandle} from '@/components/features/bottom-sheet/BottomSheetHandle'
import {BottomSheetScrollWrapper} from '@/components/features/bottom-sheet/BottomSheetScrollWrapper'
import {useBottomSheetHandler} from '@/components/features/bottom-sheet/hooks/useBottomSheetHandler'
import {useToggleBottomSheet} from '@/components/features/bottom-sheet/hooks/useToggleBottomSheet'
import {BottomSheetPresenceContext} from '@/components/features/bottom-sheet/providers/bottomSheetPresence.context'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {type TestProps} from '@/components/ui/types'

export type BottomSheetProps = {
  scroll?: boolean
  topInset?: number
} & TestProps &
  (
    | {children: ReactNode; variants?: never}
    | {
        children?: never
        /**
         * Use instead of children to show multiple bottom sheets on a screen.
         */
        variants: Record<string, FC>
      }
  )

/**
 * To autofocus on an element within the bottom sheet, use the `useSetBottomSheetElementFocus` hook.
 */
export const BottomSheet = ({
  children,
  scroll = true,
  testID,
  topInset,
  variants,
}: BottomSheetProps) => {
  const {onChange, onClose, variant, isOpen} = useBottomSheetHandler()
  const [isVisible, setIsVisible] = useState(isOpen)
  const [sheetHeight, setSheetHeight] = useState(1)
  const {top: safeTopInset, bottom: bottomInset} = useSafeAreaInsets()
  const {height: windowHeight} = useWindowDimensions()
  const isFocused = useIsFocused()
  const topOffset = topInset ?? safeTopInset

  const styles = createStyles()

  const ViewComponent = scroll ? BottomSheetScrollWrapper : View
  const VariantComponent: FC | undefined = variants
    ? (variants[variant ?? ''] ?? (() => null))
    : undefined

  const closedOffset = useMemo(
    () => sheetHeight + bottomInset,
    [bottomInset, sheetHeight],
  )
  const translateY = useSharedValue(closedOffset)
  const isOpenShared = useSharedValue(isOpen ? 1 : 0)
  const isAndroid = Platform.OS === 'android'

  useEffect(() => {
    isOpenShared.value = isOpen ? 1 : 0
  }, [isOpen, isOpenShared])

  useToggleBottomSheet({
    closedOffset,
    isAndroid,
    isOpen,
    isOpenShared,
    onChange,
    setIsVisible,
    translateY,
  })

  useEffect(() => {
    if (!(isOpen || isVisible)) {
      translateY.value = closedOffset
    }
  }, [closedOffset, isOpen, isVisible, translateY])

  if (!isFocused || !isVisible) {
    return null
  }

  return (
    <BottomSheetPresenceContext.Provider value={true}>
      <View
        pointerEvents="box-none"
        style={StyleSheet.absoluteFill}>
        <BottomSheetBackdrop
          closedOffset={closedOffset}
          onClose={onClose}
          translateY={translateY}
        />

        <BottomSheetContainer
          setSheetHeight={setSheetHeight}
          testID={testID}
          topOffset={topOffset}
          translateY={translateY}
          windowHeight={windowHeight}>
          <BackgroundComponent>
            <BottomSheetHandle
              closedOffset={closedOffset}
              isAndroid={isAndroid}
              isVisible={isVisible}
              onClose={onClose}
              sheetHeight={sheetHeight}
              translateY={translateY}
            />
            <ViewComponent style={styles.container}>
              <SafeArea
                bottom
                left
                right>
                {VariantComponent ? <VariantComponent /> : children}
              </SafeArea>
            </ViewComponent>
          </BackgroundComponent>
        </BottomSheetContainer>
      </View>
    </BottomSheetPresenceContext.Provider>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  })
