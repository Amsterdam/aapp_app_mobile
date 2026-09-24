import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ReadArticle = {
  id: string
  publicationDate: string
}

export type ConstructionWorkState = {
  readArticles: ReadArticle[]
  searchText: string
}

const initialState: ConstructionWorkState = {
  readArticles: [],
  searchText: '',
}

export const constructionWorkSlice = createSlice({
  name: ReduxKey.constructionWork,
  initialState,
  reducers: {
    addReadArticle: (state, {payload: article}: PayloadAction<ReadArticle>) => {
      state.readArticles.push(article)
    },
    deleteReadArticle: (state, {payload: articleId}: PayloadAction<string>) => {
      state.readArticles = state.readArticles.filter(
        article => article.id !== articleId,
      )
    },
    setSearchText: (state, {payload: searchText}: PayloadAction<string>) => {
      state.searchText = searchText
    },
    reset: () => initialState,
  },
})

export const {addReadArticle, deleteReadArticle, setSearchText} =
  constructionWorkSlice.actions

export const selectConstructionWorkReadArticles = (state: RootState) =>
  state[ReduxKey.constructionWork].readArticles

export const selectConstructionWorkSearchText = (state: RootState) =>
  state[ReduxKey.constructionWork].searchText
