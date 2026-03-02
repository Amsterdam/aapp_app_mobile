import type {IconProps} from '@/components/ui/media/Icon'
import type {TestProps} from '@/components/ui/types'

export type CarouselItemButton = {
  digid?: boolean
  external?: boolean
  label: string
} & (
  | {
      onPress: () => void | Promise<unknown>
      useOnPress?: never
    }
  | {
      onPress?: never
      useOnPress: () => () => void | Promise<unknown>
    }
)

export type CarouselItemVariant = {
  button?: CarouselItemButton
  contentButton?: CarouselItemButton
  icon: Pick<IconProps, 'name' | 'color' | 'isFilled'>
  showNotificationPermissionSettings?: boolean
  title: string
} & (
  | {
      text?: string
      useText?: never
    }
  | {
      text?: never
      useText: () => string
    }
) &
  TestProps

export type CarouselItem<T extends string> = {
  useVariant: () => T
  variants: Record<T, CarouselItemVariant>
}

export type Onboarding = {
  shouldShowOnboarding: boolean
}
