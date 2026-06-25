import {Account as Account0} from '@/modules/boat-charging/Account.tsx'
import {Account as Account1} from '@/modules/city-pass/Account.tsx'
import {Account as Account2} from '@/modules/mijn-amsterdam/Account.tsx'
import {Account as Account3} from '@/modules/parking/Account.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const Account = {
  [ModuleSlug['boat-charging']]: Account0,
  [ModuleSlug['city-pass']]: Account1,
  [ModuleSlug['mijn-amsterdam']]: Account2,
  [ModuleSlug.parking]: Account3,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
