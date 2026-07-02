import {HeaderComponent as headerComponents0} from '@/modules/notification-history/components/HeaderComponent.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const headerComponents = {
  [ModuleSlug['notification-history']]: headerComponents0,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
