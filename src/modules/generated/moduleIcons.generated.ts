import {ModuleIcon as moduleIcons0} from '@/modules/pride/components/ModuleIcon.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const moduleIcons = {
  [ModuleSlug.pride]: moduleIcons0,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
