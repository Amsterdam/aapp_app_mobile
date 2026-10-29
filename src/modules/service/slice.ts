import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {MarkerProperties} from '@/components/features/map/types'
import type {Service} from '@/modules/service/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ServiceState = {
  selectedServicePointId?: Record<Service['id'], MarkerProperties['id']>
}

const initialState: ServiceState = {}

export const serviceSlice = createSlice({
  name: ReduxKey.service,
  initialState,
  reducers: {
    setSelectedServicePointId: (
      state,
      {
        payload,
      }: PayloadAction<{
        serviceId: Service['id']
        servicePointId: MarkerProperties['id']
      }>,
    ) => {
      state.selectedServicePointId = {
        ...state.selectedServicePointId,
        [payload.serviceId]: payload.servicePointId,
      }
    },
    resetSelectedServicePointId: (
      state,
      {payload}: PayloadAction<Service['id']>,
    ) => {
      delete state.selectedServicePointId?.[payload]
    },
    reset: () => initialState,
  },
})

export const {setSelectedServicePointId, resetSelectedServicePointId} =
  serviceSlice.actions

export const selectSelectedServicePointId = (
  state: RootState,
  serviceId: Service['id'],
) => state[ReduxKey.service].selectedServicePointId?.[serviceId]
