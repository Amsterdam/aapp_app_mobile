import {HeaderComponent as headerComponents0} from '@/modules/mijn-amsterdam/components/HeaderComponent.tsx'
import {HeaderComponent as headerComponents1} from '@/modules/notification-history/components/HeaderComponent.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const headerComponents = {
  [ModuleSlug['mijn-amsterdam']]: headerComponents0,
  [ModuleSlug['notification-history']]: headerComponents1,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
