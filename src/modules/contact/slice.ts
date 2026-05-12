import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ContactState = {
  selectedCityOfficeId?: string
}

const initialState: ContactState = {}

export const contactSlice = createSlice({
  name: ReduxKey.contact,
  initialState,
  reducers: {
    setSelectedCityOffice: (state, {payload}: PayloadAction<string>) => {
      state.selectedCityOfficeId = payload
    },
  },
})

export const {setSelectedCityOffice} = contactSlice.actions

export const selectCityOffice = (state: RootState) =>
  state[ReduxKey.contact].selectedCityOfficeId
