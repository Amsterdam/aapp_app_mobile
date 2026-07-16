import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {HeaderComponent as headerComponents0} from '@/modules/notification-history/components/HeaderComponent.tsx'

export const headerComponents = {
  [ModuleSlug['notification-history']]: headerComponents0,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
