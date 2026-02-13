import {Account as Account0} from '@/modules/city-pass/Account.tsx'
import {Account as Account1} from '@/modules/mijn-amsterdam/Account.tsx'
import {Account as Account2} from '@/modules/parking/Account.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const Account = {
  [ModuleSlug['city-pass']]: Account0,
  [ModuleSlug['mijn-amsterdam']]: Account1,
  [ModuleSlug.parking]: Account2,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
