import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type SportState = {
  selectedSportItemOnMapId?: string
}

const initialState: SportState = {}

export const sportSlice = createSlice({
  name: ReduxKey.sport,
  initialState,
  reducers: {
    setSelectedSportItemOnMapId: (state, {payload}: PayloadAction<string>) => {
      state.selectedSportItemOnMapId = payload
    },
    resetSelectedSportItemOnMapId: state => {
      state.selectedSportItemOnMapId = undefined
    },
  },
})

export const {setSelectedSportItemOnMapId, resetSelectedSportItemOnMapId} =
  sportSlice.actions

export const selectSelectedSportItemOnMapId = (state: RootState) =>
  state[ReduxKey.sport].selectedSportItemOnMapId
