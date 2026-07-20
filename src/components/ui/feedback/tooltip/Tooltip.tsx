import {useEffect, useRef, useState} from 'react'
import {InteractionManager, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useMeasureTarget} from '@/components/features/product-tour/useMeasureTarget'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Pointer} from '@/components/ui/feedback/tooltip/Pointer'
import {TooltipContent} from '@/components/ui/feedback/tooltip/TooltipContent'
import {TooltipWrapper} from '@/components/ui/feedback/tooltip/TooltipWrapper'
import {TooltipProps} from '@/components/ui/feedback/tooltip/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Placement} from '@/components/ui/types'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const Tooltip = ({
  ref,
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  extraSpace,
  fadeIn,
  fadeInDuration,
  placement,
  productTourTipTargetLayout,
  onPress,
  startFadeIn,
  testID,
  text,
}: TooltipProps) => {
  const setAccessibilityFocus = useAccessibilityFocus()
  const [leftPosition, setLeftPosition] = useState(0) // Start off-screen to avoid jump
  const [isPositioned, setIsPositioned] = useState(false)
  const styles = useThemable(createStyles(!!productTourTipTargetLayout))
  const tooltipRef = useRef<View | null>(null)
  const {layout, measureTarget} = useMeasureTarget(tooltipRef)
  const {left} = useSafeAreaInsets()

  useEffect(() => {
    if (!layout) {
      return
    }

    void InteractionManager.runAfterInteractions(() => {
      setLeftPosition(layout.x - left)
      setIsPositioned(true)
    })
  }, [layout, left])

  useBlurEffect(() => setIsPositioned(false))

  const PointerComponent = (
    <Pointer
      placement={placement}
      productTourTipTargetLayout={productTourTipTargetLayout}
    />
  )

  return (
    <View
      collapsable={false}
      onLayout={measureTarget}
      ref={tooltipRef}
      style={styles.container}>
      {!!layout && (
        <TooltipWrapper
          extraSpace={extraSpace}
          fadeIn={fadeIn}
          fadeInDuration={fadeInDuration}
          isPositioned={isPositioned}
          leftPosition={leftPosition}
          placement={placement}
          productTourTipTargetLayout={productTourTipTargetLayout}
          ref={ref}
          startFadeIn={startFadeIn}>
          <PressableBase
            accessibilityLabel={accessibilityLabel}
            accessibilityLanguage={accessibilityLanguage}
            accessibilityRole="alert"
            onPress={onPress}
            ref={setAccessibilityFocus}
            testID={testID}>
            <Row>
              {placement === Placement.after && PointerComponent}
              <Column grow={1}>
                {placement === Placement.below && PointerComponent}
                <TooltipContent
                  testID={testID}
                  text={text}
                />
                {placement === Placement.above && PointerComponent}
              </Column>
              {placement === Placement.before && PointerComponent}
            </Row>
          </PressableBase>
        </TooltipWrapper>
      )}
    </View>
  )
}

const createStyles =
  (isAbsolute: boolean) =>
  ({z}: Theme) =>
    StyleSheet.create({
      container: {
        position: isAbsolute ? 'absolute' : undefined,
        zIndex: z.tooltip,
        height: '100%',
        width: '100%',
      },
    })
