import BottomSheetOriginal, {
  BottomSheetProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import {useIsFocused} from '@react-navigation/native'
import {useEffect, type FC, type ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Backdrop} from '@/components/features/bottom-sheet/Backdrop'
import {BackgroundComponent} from '@/components/features/bottom-sheet/BackgroundComponent'
import {BottomSheetPresenceContext} from '@/components/features/bottom-sheet/BottomSheetPresenceContext'
import {Handle} from '@/components/features/bottom-sheet/Handle'
import {useBottomSheetHandler} from '@/components/features/bottom-sheet/hooks/useBottomSheetHandler'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {type TestProps} from '@/components/ui/types'

type Props = Partial<
  Omit<
    BottomSheetProps,
    | 'children'
    | 'contentHeight'
    | 'handleHeight'
    | 'onChange'
    | 'ref'
    | 'snapPoints'
  >
> & {
  flex?: number
  scroll?: boolean
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

const ScrollWrapper = ({children}: {children: ReactNode}) => (
  <BottomSheetScrollView keyboardShouldPersistTaps="handled">
    {children}
  </BottomSheetScrollView>
)

/**
 * To autofocus on an element within the bottom sheet, use the `useSetBottomSheetElementFocus` hook.
 */
export const BottomSheet = ({
  children,
  flex,
  scroll,
  testID,
  variants,
  ...rest
}: Props) => {
  const {onChange: onChangeHandler, ref, variant} = useBottomSheetHandler()
  const {top: topInset} = useSafeAreaInsets()
  const ViewComponent = scroll ? ScrollWrapper : BottomSheetView
  const styles = createStyles(flex)
  const isFocused = useIsFocused()

  const VariantComponent: FC | undefined = variants
    ? (variants[variant ?? ''] ?? (() => null))
    : undefined

  useEffect(() => {
    if (variants && !variants[variant ?? '']) {
      ref.current?.close()
    }
  }, [variant, variants, ref])

  if (!isFocused) {
    return null
  }

  return (
    <BottomSheetPresenceContext.Provider value={true}>
      <BottomSheetOriginal
        accessible={false}
        backdropComponent={Backdrop}
        backgroundComponent={BackgroundComponent}
        enableContentPanningGesture={false}
        enablePanDownToClose
        handleComponent={Handle}
        index={-1}
        keyboardBlurBehavior="restore"
        onChange={onChangeHandler}
        ref={ref}
        topInset={topInset}
        {...rest}>
        <ViewComponent
          style={styles.container}
          testID={testID}>
          <SafeArea
            bottom
            flex={flex}
            left
            right
            testID={testID}>
            {VariantComponent ? <VariantComponent /> : children}
          </SafeArea>
        </ViewComponent>
      </BottomSheetOriginal>
    </BottomSheetPresenceContext.Provider>
  )
}

const createStyles = (flex?: number) =>
  StyleSheet.create({
    container: {
      flex,
      flexGrow: 1,
    },
  })
