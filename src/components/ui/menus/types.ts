import {TestProps} from '@/components/ui/types'
import type {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {Theme} from '@/themes/themes'

export type PopupMenuItem = {
  /**
   * @default 'link'
   */
  color?: keyof Theme['color']['text']
  id?: string
  label: string
} & Or<
  {
    onPress: () => void
  },
  {redirectKey: RedirectKey}
> &
  TestProps

export enum PopupMenuOrientation {
  left = 'left',
  right = 'right',
}
