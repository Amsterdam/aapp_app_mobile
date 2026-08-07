import type {TestProps} from '@/components/ui/types'
import type {
  ProjectContact,
  ProjectSection,
  ProjectTimeline,
  ProjectsItem,
} from '@/modules/construction-work/types/api'

export type ProjectsListItem = ProjectsItem & {
  dummy?: boolean
}

export type ProjectSegment = {
  contacts?: ProjectContact[] | null
  sections?: ProjectSection[] | null
  timeline?: ProjectTimeline | null
  title: string
} & TestProps
