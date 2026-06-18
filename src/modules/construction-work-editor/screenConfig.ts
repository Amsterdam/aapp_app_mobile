import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ConstructionWorkEditorModalName,
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorRouteName,
  type ModuleStackParams,
} from '@/modules/construction-work-editor/routes'
import {AddMainImageToMessageScreen} from '@/modules/construction-work-editor/screens/AddMainImageToMessage.screen'
import {AuthorizedProjectsScreen} from '@/modules/construction-work-editor/screens/AuthorizedProjects.screen'
import {ConfirmMessageScreen} from '@/modules/construction-work-editor/screens/ConfirmMessage.screen'
import {CreateMessageScreen} from '@/modules/construction-work-editor/screens/CreateMessage.screen'
import {WritingGuideScreen} from '@/modules/construction-work-editor/screens/WritingGuide.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  ConstructionWorkEditorRouteName
> = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ConstructionWorkEditorRouteName.authorizedProjects,
    options: {
      headerTitle: 'Plaats berichten',
    },
  },
  [ConstructionWorkEditorRouteName.createMessage]: {
    component: CreateMessageScreen,
    name: ConstructionWorkEditorRouteName.createMessage,
    options: {
      preventInitialFocus: true,
    },
  },
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: {
    component: AddMainImageToMessageScreen,
    name: ConstructionWorkEditorRouteName.addMainImageToMessage,
    options: {
      preventInitialFocus: true,
    },
  },
  [ConstructionWorkEditorRouteName.confirmMessage]: {
    component: ConfirmMessageScreen,
    name: ConstructionWorkEditorRouteName.confirmMessage,
  },
}

export const modals: StackNavigationRoutes<
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorModalName
> = {
  [ConstructionWorkEditorModalName.writingGuide]: {
    component: WritingGuideScreen,
    name: ConstructionWorkEditorModalName.writingGuide,
  },
}
