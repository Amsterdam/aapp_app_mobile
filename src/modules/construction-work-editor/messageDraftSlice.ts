import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {ImagePickerAsset} from 'expo-image-picker'
import {AddProjectWarningQueryArgs} from '@/modules/construction-work-editor/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {NotificationQueryArg} from '@/types/notification'

export type ProjectIdAndTitle = {id: string; title: string}

export type MessageDraft = {
  mainImage?: ImagePickerAsset
  mainImageDescription?: string
  message?: AddProjectWarningQueryArgs
  notification?: NotificationQueryArg
  project?: ProjectIdAndTitle
}

export type MessageDraftState = Record<string, MessageDraft> & {
  currentProjectId: string
}

const initialState = {} as MessageDraftState

export const messageDraftSlice = createSlice({
  name: ReduxKey.messageDraft,
  initialState,
  reducers: {
    clearDraft: () => initialState,
    setCurrentProjectId: (
      state,
      {payload: currentProjectId}: PayloadAction<string>,
    ) => {
      state.currentProjectId = currentProjectId
    },
    setMainImage: (
      state,
      {
        payload: {projectId, mainImage},
      }: PayloadAction<{
        mainImage: ImagePickerAsset | undefined
        projectId: string
      }>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        mainImage,
      }
    },
    setMainImageDescription: (
      state,
      {
        payload: {projectId, mainImageDescription},
      }: PayloadAction<{
        mainImageDescription: string | undefined
        projectId: string
      }>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        mainImageDescription,
      }
    },
    setNotification: (
      state,
      {
        payload: {projectId, notification},
      }: PayloadAction<{notification: NotificationQueryArg; projectId: string}>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        notification,
      }
    },
    setProject: (
      state,
      {payload: project}: PayloadAction<ProjectIdAndTitle>,
    ) => {
      state[project.id] = {
        ...state[project.id],
        project,
      }
    },

    setMessage: (
      state,
      {
        payload: {projectId, message},
      }: PayloadAction<{
        message: AddProjectWarningQueryArgs
        projectId: string
      }>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        message,
      }
    },
  },
})

export const {
  clearDraft,
  setCurrentProjectId,
  setMainImage,
  setMainImageDescription,
  setNotification,
  setProject,
  setMessage,
} = messageDraftSlice.actions

export const selectCurrentProjectId = createSelector(
  (state: RootState) => state[ReduxKey.messageDraft],
  messageDraft => messageDraft?.currentProjectId,
)

export const selectMainImage = (id: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.messageDraft],
    messageDraft => messageDraft[id]?.mainImage,
  )

export const selectMainImageDescription = (id: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.messageDraft],
    messageDraft => messageDraft[id]?.mainImageDescription,
  )

export const selectNotification = (id: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.messageDraft],
    messageDraft => messageDraft[id]?.notification,
  )

export const selectProject = (id: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.messageDraft],
    messageDraft => messageDraft[id]?.project,
  )

export const selectProjectId = createSelector(
  (state: RootState) => state[ReduxKey.messageDraft],
  messageDraft => messageDraft.currentProjectId,
)

export const selectMessage = (id: string) =>
  createSelector(
    (state: RootState) => state[ReduxKey.messageDraft],
    messageDraft => messageDraft[id]?.message,
  )
