import type {IconProps} from '@/components/ui/media/Icon'
import type {AccessCodeRouteName} from '@/modules/access-code/routes'
import type {AddressRouteName} from '@/modules/address/routes'
import type {OnboardingRouteName} from '@/modules/onboarding/routes'
import type {ModuleSlug} from '@/modules/slugs'
import type {UserRouteName} from '@/modules/user/routes'

export type UserMenuSection = {
  navigationItems: UserMenuSectionItem[]
  title?: string
}

export type UserMenuSectionItem = {
  icon?: Pick<IconProps, 'name' | 'isFilled'>
  label: string
  moduleSlug?: ModuleSlug
  route?:
    | AccessCodeRouteName
    | AddressRouteName
    | UserRouteName
    | OnboardingRouteName
}

export type NotificationType = {
  description: string
  type: string
}

export type NotificationModule = {
  description: string
  module: ModuleSlug
  types: Array<NotificationType>
}

export type NotificationModulesResponse = NotificationModule[]
