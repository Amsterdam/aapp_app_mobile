import {type ReactNode} from 'react'
import type {ScreenBackgroundOverlayProps} from '@/components/ui/containers/ScreenBackgroundOverlay'
import {HeaderProps} from '@/components/features/header/types'
import {type Tip} from '@/components/features/product-tour/types'
import {ScreenBase} from '@/components/features/screen/ScreenBase'
import {type TestProps} from '@/components/ui/types'

export type WithInsetProps = {
  withBottomInset?: boolean
  withLeftInset?: boolean
  withRightInset?: boolean
  withTopInset?: boolean
}

export type ScreenProps = {
  /**
   * A background overlay of the screen. Starts from the top and depending on the size, covers part of the screen.
   */
  backgroundOverlay?: ScreenBackgroundOverlayProps
  bottomSheet?: ReactNode
  children: ReactNode
  hasStickyAlert?: boolean
  headerOptions?: HeaderProps['options']
  isOutsideNavigation?: boolean
  keyboardAware?: boolean
  scroll?: boolean
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
  /**
   * Include all product-tour tips on the screen to determine if the scroll should be tracked
   */
  trackScroll?: Tip[]
} & TestProps &
  WithInsetProps

export const Screen = ScreenBase
