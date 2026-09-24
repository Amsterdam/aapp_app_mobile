import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ConstructionWorkEditorState = {
  accessToken?: string
  hasAutoFollowedProjects: boolean
  hasSeenWelcomeMessage: boolean
}

const initialState: ConstructionWorkEditorState = {
  accessToken: undefined,
  hasSeenWelcomeMessage: false,
  hasAutoFollowedProjects: false,
}

export const constructionWorkEditorSlice = createSlice({
  name: ReduxKey.constructionWorkEditor,
  initialState,
  reducers: {
    saveConstructionWorkEditorToken: (
      state,
      {payload: accessToken}: PayloadAction<string>,
    ) => {
      state.accessToken = accessToken
    },
    removeConstructionWorkEditorToken: state => {
      state.accessToken = undefined
    },
    setHasSeenWelcomeMessage: (
      state,
      {payload: hasSeen}: PayloadAction<boolean>,
    ) => {
      state.hasSeenWelcomeMessage = hasSeen
    },
    setHasAutoFollowedProjects: (
      state,
      {payload: hasFollowed}: PayloadAction<boolean>,
    ) => {
      state.hasAutoFollowedProjects = hasFollowed
    },
    reset: () => initialState,
  },
})

export const {
  saveConstructionWorkEditorToken,
  setHasSeenWelcomeMessage,
  removeConstructionWorkEditorToken,
  setHasAutoFollowedProjects,
} = constructionWorkEditorSlice.actions

export const selectConstructionWorkEditorAccessToken = (state: RootState) =>
  state[ReduxKey.constructionWorkEditor].accessToken

export const selectConstructionWorkEditorHasSeenWelcomeMessage = (
  state: RootState,
) => state[ReduxKey.constructionWorkEditor].hasSeenWelcomeMessage
export const selectConstructionWorkEditorHasAutoFollowedProjects = (
  state: RootState,
) => state[ReduxKey.constructionWorkEditor].hasAutoFollowedProjects
