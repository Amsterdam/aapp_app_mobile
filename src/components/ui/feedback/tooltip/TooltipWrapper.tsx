import {StyleSheet, useWindowDimensions, View, ViewProps} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Fader} from '@/components/ui/animations/Fader'
import {
  TooltipProps,
  WrapperProps,
} from '@/components/ui/feedback/tooltip/types'
import {Placement} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = WrapperProps & ViewProps

export const TooltipWrapper = ({
  ref,
  extraSpace,
  isPositioned,
  leftPosition,
  placement,
  productTourTipTargetLayout,
  fadeIn,
  fadeInDuration,
  startFadeIn,
  ...props
}: Props) => {
  const {width: windowWidth} = useWindowDimensions()
  const {left, right} = useSafeAreaInsets()

  const styles = useThemable(
    createStyles({
      extraSpace,
      isPositioned,
      leftPosition,
      placement,
      productTourTipTargetLayout,
      windowWidth: windowWidth - left - right,
    }),
  )

  return fadeIn ? (
    <Fader
      {...props}
      duration={fadeInDuration}
      ref={ref}
      shouldAnimate={startFadeIn}
      style={styles.tooltipWrapper}
    />
  ) : (
    <View
      {...props}
      ref={ref}
      style={styles.tooltipWrapper}
    />
  )
}

const createStyles =
  ({
    extraSpace,
    isPositioned,
    leftPosition,
    placement,
    productTourTipTargetLayout,
    windowWidth,
  }: Pick<
    TooltipProps,
    'extraSpace' | 'placement' | 'productTourTipTargetLayout'
  > & {isPositioned: boolean; leftPosition: number; windowWidth: number}) =>
  ({size, z}: Theme) => {
    const verticalPosition =
      productTourTipTargetLayout.height +
      (extraSpace ? size.spacing[extraSpace] : 0)

    const tooltipPositionProps =
      placement === Placement.above
        ? {bottom: verticalPosition}
        : {top: verticalPosition}

    return StyleSheet.create({
      tooltipWrapper: {
        display: isPositioned ? 'flex' : 'none',
        width: productTourTipTargetLayout ? windowWidth : undefined,
        left: -leftPosition,
        position: 'absolute',
        paddingHorizontal: productTourTipTargetLayout
          ? size.spacing.xl
          : undefined,
        ...tooltipPositionProps,
        zIndex: z.tooltip, // Set zIndex higher in component tree as well when not working as expected on iOS
      },
    })
  }
