import type {IconProps} from '@/components/ui/media/Icon'
import type {TestProps} from '@/components/ui/types'

export type CarouselItem = {
  button: {
    label: string
    onPress: () => void
  }
  iconName: IconProps['name']
  text: string
  title: string
} & TestProps

export type Onboarding = {
  hasSeenOnboarding: boolean
}
