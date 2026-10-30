import type {ReactNode, Ref} from 'react'
import {LayoutRectangle, type AccessibilityProps, View} from 'react-native'
import {Placement, type TestProps} from '@/components/ui/types'
import {SpacingTokens} from '@/themes/tokens/size'

export type WrapperProps = {
  children: ReactNode
  /**
   * Extra space to set between target and tooltip
   */
  extraSpace?: keyof SpacingTokens
  /**
   * Determines whether the tooltip fades in and out. Default is 300 ms.
   */
  fadeIn?: boolean
  /**
   * Duration of the fade-in animation in milliseconds, only works when fade = true
   */
  fadeInDuration?: number
  isPositioned: boolean
  leftPosition: number
  placement: Placement
  productTourTipTargetLayout: LayoutRectangle
  ref?: Ref<View | null>
  startFadeIn?: boolean
}

export type TooltipProps = {
  onPress: () => void
  ref?: Ref<View | null>
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  Omit<WrapperProps, 'children' | 'leftPosition' | 'isPositioned'> &
  TestProps

export enum PointerDimension {
  height = 16,
  width = 32,
}
