import {PreRenderComponent as preRenderComponents0} from '@/modules/construction-work/components/PreRenderComponent.tsx'
import {PreRenderComponent as preRenderComponents1} from '@/modules/parking/components/PreRenderComponent.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const preRenderComponents = {
  [ModuleSlug['construction-work']]: preRenderComponents0,
  [ModuleSlug.parking]: preRenderComponents1,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
