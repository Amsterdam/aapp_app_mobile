import {Account as Account0} from '@/modules/boat-charging/components/Account.tsx'
import {Account as Account1} from '@/modules/city-pass/components/Account.tsx'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {Account as Account2} from '@/modules/mijn-amsterdam/components/Account.tsx'
import {Account as Account3} from '@/modules/mijn-amsterdam-new/components/Account.tsx'
import {Account as Account4} from '@/modules/parking/components/Account.tsx'

export const Account = {
  [ModuleSlug['boat-charging']]: Account0,
  [ModuleSlug['city-pass']]: Account1,
  [ModuleSlug['mijn-amsterdam']]: Account2,
  [ModuleSlug['mijn-amsterdam-new']]: Account3,
  [ModuleSlug.parking]: Account4,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
