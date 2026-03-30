import {ReactNode} from 'react'
import type {NavigateTo} from '@/app/navigation/types'
import {TestProps} from '@/components/ui/types'

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
   * navigateTo: {
   *    label: 'Dit is een link',
   *    params: [AddressRouteName.chooseAddress, { moduleSlug: ModuleSlug.address }],
   * }
   * ```
   * @example
   * This example fills the link with a route and params to another Navigator Stack
   * ```ts
   * link: {
   *    label: 'Dit is een link',
   *    to: [
   *        ModuleSlug.address,
   *        {
   *            screen: AddressRouteName.chooseAddress,
   *            params: { moduleSlug: ModuleSlug.address } },
   *        }
   *    ],
   * }
   * ```
   */
  navigateTo?: {
    label: string
    params: NavigateTo
  }
  text?: string | ReactNode
  title?: string
  variant?: AlertVariant
} & TestProps

export type AlertsRecord = Record<
  `${string}${'Warning' | 'Success' | 'Failed' | 'Info'}`,
  AlertProps
>
