import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ServiceState = {
  selectedServicePointId?: string
}

const initialState: ServiceState = {}

export const serviceSlice = createSlice({
  name: ReduxKey.service,
  initialState,
  reducers: {
    setSelectedServicePointId: (state, {payload}: PayloadAction<string>) => {
      state.selectedServicePointId = payload
    },
    resetSelectedServicePointId: state => {
      state.selectedServicePointId = undefined
    },
  },
})

export const {setSelectedServicePointId, resetSelectedServicePointId} =
  serviceSlice.actions

export const selectSelectedServicePointId = (state: RootState) =>
  state[ReduxKey.service].selectedServicePointId
