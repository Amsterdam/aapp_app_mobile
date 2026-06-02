import {ReactNode, useCallback, use, useRef} from 'react'
import {View} from 'react-native'
import {ScrollContext} from '@/components/features/product-tour/ScrollContext'
import {
  selectSeenTips,
  addSeenTip,
} from '@/components/features/product-tour/slice'
import {Tip, TipText} from '@/components/features/product-tour/types'
import {useMeasureTarget} from '@/components/features/product-tour/useMeasureTarget'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement, TestProps} from '@/components/ui/types'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  children: ReactNode
  extraSpace?: keyof SpacingTokens
  placement: Placement
  tipSlug: Tip
} & TestProps

export const ProductTourTipWrapper = ({
  children,
  extraSpace,
  tipSlug,
  placement,
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const seenTips = useSelector(selectSeenTips)
  const hasSeenTip = seenTips.includes(tipSlug)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const scrollContext = use(ScrollContext)
  const hasNoScrollViewParent = scrollContext === null
  const {setElementRef, isElementVisible} = scrollContext ?? {}
  const tipTargetRef = useRef<View | null>(null)
  const {layout: productTourTipTargetLayout, measureTarget} =
    useMeasureTarget(tipTargetRef)

  const handleHasSeenTip = useCallback(() => {
    if ((hasNoScrollViewParent || isElementVisible) && !hasSeenTip) {
      dispatch(addSeenTip(tipSlug))
    }
  }, [dispatch, hasNoScrollViewParent, hasSeenTip, isElementVisible, tipSlug])

  useBlurEffect(handleHasSeenTip)

  return (
    <View testID="ProductTourTipWrapper">
      {!hasSeenTip &&
        !isScreenReaderEnabled &&
        !!productTourTipTargetLayout && (
          <Tooltip
            accessibilityLabel={TipText[tipSlug]}
            extraSpace={extraSpace}
            fadeIn
            onPress={handleHasSeenTip}
            placement={placement}
            productTourTipTargetLayout={productTourTipTargetLayout}
            ref={setElementRef}
            startFadeIn={isElementVisible ?? hasNoScrollViewParent}
            testID={testID}
            text={TipText[tipSlug]}
          />
        )}
      <View
        collapsable={false}
        onLayout={measureTarget}
        ref={tipTargetRef}>
        {children}
      </View>
    </View>
  )
}
