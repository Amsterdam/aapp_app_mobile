import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import type {RootState} from '@/store/types/rootState'

export type NewsState = {
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
  },
})

export const {setSelectedDistrict} = NewsSlice.actions

export const selectSelectedDistrict = (state: RootState) =>
  state[ReduxKey.news].selectedDistrict
