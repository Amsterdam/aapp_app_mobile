import {Account as Account0} from '@/modules/boat-charging/components/Account.tsx'
import {Account as Account1} from '@/modules/city-pass/components/Account.tsx'
import {Account as Account2} from '@/modules/mijn-amsterdam/components/Account.tsx'
import {Account as Account3} from '@/modules/parking/components/Account.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const Account = {
  [ModuleSlug['boat-charging']]: Account0,
  [ModuleSlug['city-pass']]: Account1,
  [ModuleSlug['mijn-amsterdam']]: Account2,
  [ModuleSlug.parking]: Account3,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
