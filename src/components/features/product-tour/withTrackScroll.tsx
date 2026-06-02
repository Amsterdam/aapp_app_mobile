import {
  ComponentType,
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {ScrollView, View} from 'react-native'
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller'
import {ScrollContext} from '@/components/features/product-tour/ScrollContext'
import {
  computeIsElementVisible,
  measureElement,
} from '@/components/features/product-tour/utils'
import {ScrollViewProps} from '@/components/ui/layout/ScrollView'

export type ScrollViewRef = ScrollView | KeyboardAwareScrollViewRef

type ScrollViewWrapperProps = ScrollViewProps & {
  childRef?: ForwardedRef<ScrollViewRef> | null
  ref?: ForwardedRef<ScrollViewRef> | null
}

const withTrackScroll = (
  ScrollViewComp:
    | ComponentType<ScrollViewProps>
    | ComponentType<KeyboardAwareScrollViewProps>,
  refPropName = 'ref',
) => {
  const ScrollViewWrapper = ({children, ...props}: ScrollViewWrapperProps) => {
    const scrollViewRef = useRef<ScrollViewRef | null>(null)
    const [elementRef, setElementRef] = useState<View | null>(null)
    const [isElementVisible, setIsElementVisible] = useState<boolean>(false)

    const getIsElementVisible = useCallback(async () => {
      if (!scrollViewRef?.current || !elementRef) {
        return false
      }

      const [scrollViewLayout, elementLayout] = await Promise.all([
        measureElement(scrollViewRef.current as unknown as View),
        measureElement(elementRef),
      ])

      setIsElementVisible(
        computeIsElementVisible(scrollViewLayout, elementLayout),
      )
    }, [scrollViewRef, elementRef])

    const scrollViewProps = {
      ...props,
      onLayout: getIsElementVisible,
      onScroll: getIsElementVisible,
      [refPropName]: scrollViewRef,
      scrollEventThrottle: 16,
    }

    const value = useMemo(
      () => ({isElementVisible, setElementRef}),
      [isElementVisible, setElementRef],
    )

    useEffect(() => {
      void getIsElementVisible()
    }, [getIsElementVisible])

    return (
      <ScrollViewComp {...scrollViewProps}>
        <ScrollContext value={value}>{children}</ScrollContext>
      </ScrollViewComp>
    )
  }

  return ({ref, ...props}: ScrollViewWrapperProps) => (
    <ScrollViewWrapper
      {...props}
      childRef={ref}
    />
  )
}

export const KeyboardAwareTrackScrollView = withTrackScroll(
  KeyboardAwareScrollView,
  'innerRef',
)
export const TrackScrollView = withTrackScroll(ScrollView)
