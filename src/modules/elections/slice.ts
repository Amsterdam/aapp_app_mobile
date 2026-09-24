import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {PollingStation} from '@/modules/elections/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ElectionsState = {
  selectedPollingStationId?: PollingStation['id']
}

const initialState: ElectionsState = {
  selectedPollingStationId: undefined,
}

export const electionsSlice = createSlice({
  name: ReduxKey.elections,
  initialState,
  reducers: {
    setSelectedPollingStationId: (
      state,
      {payload: id}: PayloadAction<PollingStation['id']>,
    ) => {
      state.selectedPollingStationId = id
    },
    resetSelectedPollingStationId: state => {
      state.selectedPollingStationId = undefined
    },
    reset: () => initialState,
  },
})

export const {setSelectedPollingStationId, resetSelectedPollingStationId} =
  electionsSlice.actions

export const selectSelectedPollingStationId = (state: RootState) =>
  state[ReduxKey.elections].selectedPollingStationId

export const useSelectedPollingStationId = () =>
  useSelector(selectSelectedPollingStationId)
