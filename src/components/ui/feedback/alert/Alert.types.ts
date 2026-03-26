import {ReactNode} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import type {ModuleStackParams} from '@/modules/stacks'
import {TestProps} from '@/components/ui/types'

export type NavigateTo = {
  [RouteName in keyof ModuleStackParams]: {
    name: RouteName
    params: ModuleStackParams[RouteName] extends undefined
      ? undefined
      : ModuleStackParams[RouteName]
  }
}[keyof ModuleStackParams]

export enum AlertVariant {
  information = 'information',
  negative = 'negative',
  positive = 'positive',
  warning = 'warning',
}

export type AlertProps = {
  children?: ReactNode
  hasCloseIcon?: boolean
  hasIcon?: boolean
  /**
   * If the Alert should include a link to an internal route, use this property
   * @example
   * This example fills the link with a route and params within the current Navigator Stack
   * ```ts
   * link: {
   *    label: 'Dit is een link',
   *    to: { name: AddressRouteName.address, params: undefined },
   * }
   * ```
   * @example
   * This example fills the link with a route and params to another Navigator Stack
   * ```ts
   * link: {
   *    label: 'Dit is een link',
   *    to: [
   *        ModuleSlug.Address,
   *        {
   *            name: AddressRouteName.chooseAddress,
   *            params: { id: 123 } },
   *        }
   *    ],
   * }
   * ```
   */
  link?: {
    label: string
    to: NavigateTo | [ModuleSlug, NavigateTo]
  }
  text?: string | ReactNode
  title?: string
  variant?: AlertVariant
} & TestProps

export type AlertsRecord = Record<
  `${string}${'Warning' | 'Success' | 'Failed' | 'Info'}`,
  AlertProps
>
