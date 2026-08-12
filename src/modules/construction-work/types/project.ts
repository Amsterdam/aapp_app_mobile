import type {TestProps} from '@/components/ui/types'
import type {
  ProjectContact,
  ProjectSection,
  ProjectTimeline,
  ProjectsItem,
} from '@/modules/construction-work/types/api'
import type {WithDummy} from '@/services/types'

export type ProjectsListItem = WithDummy<ProjectsItem>

export type ProjectSegment = {
  contacts?: ProjectContact[] | null
  sections?: ProjectSection[] | null
  timeline?: ProjectTimeline | null
  title: string
} & TestProps
