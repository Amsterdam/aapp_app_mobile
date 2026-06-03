import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/store/types/rootState'
import {
  DashboardHighlightStatus,
  type NewsArticleBase,
} from '@/modules/news/types'
import {ReduxKey} from '@/store/types/reduxKey'

export type NewsState = {
  highlightedArticleId?: {
    id: NewsArticleBase['id']
    status: DashboardHighlightStatus
  }
  selectedDistrict: string
}

const initialState: NewsState = {
  selectedDistrict: 'centrum',
}

export const NewsSlice = createSlice({
  name: ReduxKey.news,
  initialState,
  reducers: {
    setSelectedDistrict: (
      state,
      {payload: district}: PayloadAction<string>,
    ) => {
      state.selectedDistrict = district
    },
    setHighlightedArticleId: (
      state,
      {payload: articleId}: PayloadAction<NewsArticleBase['id']>,
    ) => {
      state.highlightedArticleId = {
        id: articleId,
        status: DashboardHighlightStatus.active,
      }
    },
    markHighlightArticleAsStale: state => {
      if (state.highlightedArticleId?.id === undefined) return

      state.highlightedArticleId = {
        ...state.highlightedArticleId,
        status: DashboardHighlightStatus.stale,
      }
    },
  },
})

export const {
  setSelectedDistrict,
  setHighlightedArticleId,
  markHighlightArticleAsStale,
} = NewsSlice.actions

export const selectSelectedDistrict = (state: RootState) =>
  state[ReduxKey.news].selectedDistrict

export const selectHighlightedArticleId = (state: RootState) =>
  state[ReduxKey.news].highlightedArticleId?.id

export const selectHighlightedArticleStatus = (state: RootState) =>
  state[ReduxKey.news].highlightedArticleId?.status
