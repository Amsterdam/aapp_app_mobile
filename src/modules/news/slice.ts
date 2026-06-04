import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/store/types/rootState'
import {
  DashboardHighlightStatus,
  type NewsArticleBase,
} from '@/modules/news/types'
import {ReduxKey} from '@/store/types/reduxKey'

export type NewsState = {
  highlightedArticles: {
    queue: Array<NewsArticleBase['id']>
    status: DashboardHighlightStatus
  }
  selectedDistrict: string
}

const initialState: NewsState = {
  selectedDistrict: 'centrum',
  highlightedArticles: {
    queue: [],
    status: DashboardHighlightStatus.stale,
  },
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
    setHighlightedArticleQueue: (
      state,
      {payload: articleIds}: PayloadAction<Array<NewsArticleBase['id']>>,
    ) => {
      state.highlightedArticles = {
        queue: articleIds,
        status: DashboardHighlightStatus.active,
      }
    },
    markHighlightArticleAsStale: state => {
      state.highlightedArticles.status = DashboardHighlightStatus.stale
    },
  },
})

export const {
  setSelectedDistrict,
  setHighlightedArticleQueue,
  markHighlightArticleAsStale,
} = NewsSlice.actions

export const selectSelectedDistrict = (state: RootState) =>
  state[ReduxKey.news].selectedDistrict

export const selectHighlightedArticleQueue = (state: RootState) =>
  state[ReduxKey.news].highlightedArticles?.queue

export const selectHighlightedArticleStatus = (state: RootState) =>
  state[ReduxKey.news].highlightedArticles?.status
