import {
  type TitleParams,
  type VariableContentParams,
} from '@/app/navigation/types'
import {type ProjectSegment} from '@/modules/construction-work/types/project'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectNews = 'ProjectNews',
  projectSegment = 'ProjectSegment',
  projectWarning = 'ProjectWarning',
  search = 'ConstructionWorkSearch',
}

export type ModuleStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.search]: undefined
  [ConstructionWorkRouteName.project]: {id: number}
  [ConstructionWorkRouteName.projectSegment]: TitleParams & {
    body: ProjectSegment
  }
  [ConstructionWorkRouteName.projectNews]: VariableContentParams & {
    isPushNotificationDeeplink?: string
    projectId?: number
  }
  [ConstructionWorkRouteName.projectWarning]: VariableContentParams & {
    projectId?: number
  }
}
