import type {TitleParams} from '@/app/navigation/types'

export enum ConstructionWorkEditorRouteName {
  addMainImageToMessage = 'AddMainImageToMessage',
  authorizedProjects = 'AuthorizedProjects',
  confirmMessage = 'ConfirmMessage',
  createMessage = 'CreateMessage',
}

export type ModuleStackParams = {
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    accessToken?: string
    id?: string
    showSuccessfullySentMessageAlert?: boolean
  }
  [ConstructionWorkEditorRouteName.confirmMessage]: TitleParams
  [ConstructionWorkEditorRouteName.createMessage]: TitleParams & {
    projectId: number
  }
}

export enum ConstructionWorkEditorModalName {
  writingGuide = 'WritingGuide',
}

export type ModuleModalParams = {
  [ConstructionWorkEditorModalName.writingGuide]: TitleParams
}
