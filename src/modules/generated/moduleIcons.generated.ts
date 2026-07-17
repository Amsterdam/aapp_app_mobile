import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ModuleIcon as moduleIcons0} from '@/modules/pride/components/ModuleIcon.tsx'

export const moduleIcons = {
  [ModuleSlug.pride]: moduleIcons0,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
