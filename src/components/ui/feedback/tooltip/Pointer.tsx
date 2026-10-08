import {ReactNode} from 'react'
import {View, StyleSheet, LayoutRectangle} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {PointerDimension} from '@/components/ui/feedback/tooltip/types'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Center} from '@/components/ui/layout/Center'
import {Direction, Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const getPointerPositionX = (
  {left, right}: EdgeInsets,
  layout?: LayoutRectangle,
) => {
  if (!layout) {
    return 0
  }

  const offset = (left + right) / 2

  return layout.x + layout.width / 2 - offset
}

type Props = {
  placement: Placement
  productTourTipTargetLayout?: LayoutRectangle
}

type WrapperProps = {
  children: ReactNode
  direction: Direction
  productTourTipTargetLayout?: LayoutRectangle
}

const Wrapper = ({
  children,
  direction,
  productTourTipTargetLayout,
}: WrapperProps) =>
  direction === Direction.left ||
  direction === Direction.right ||
  !productTourTipTargetLayout ? (
    <Center>{children}</Center>
  ) : (
    <>{children}</>
  )

export const Pointer = ({placement, productTourTipTargetLayout}: Props) => {
  const direction = mapPlacementToDirection(placement)
  const insets = useSafeAreaInsets()
  const styles = useThemable(
    createStyles(getPointerPositionX(insets, productTourTipTargetLayout)),
  )

  return (
    <Wrapper
      direction={direction}
      productTourTipTargetLayout={productTourTipTargetLayout}>
      <View style={styles.pointer}>
        <Triangle direction={direction} />
      </View>
    </Wrapper>
  )
}

const createStyles =
  (positionX: number) =>
  ({size}: Theme) =>
    StyleSheet.create({
      pointer: {
        marginLeft: positionX
          ? positionX - PointerDimension.width / 2 - size.spacing.xl
          : undefined,
      },
    })
