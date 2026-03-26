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
