import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {AccessCodeRouteName} from '@/modules/access-code/routes'
import type {AddressRouteName} from '@/modules/address/routes'
import type {ModuleSlug} from '@/modules/slugs'
import type {UserRouteName} from '@/modules/user/routes'
import {OnboardingRouteName} from '@/modules/onboarding/routes'

export type UserMenuSection = {
  navigationItems: UserMenuSectionItem[]
  title?: string
}

export type UserMenuSectionItem = {
  iconName?: SvgIconName
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
