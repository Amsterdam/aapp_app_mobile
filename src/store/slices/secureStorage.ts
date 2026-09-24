import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {SecureItemKey} from '@/utils/secureStorage'

export type SecureStorageState = Record<SecureItemKey, number | undefined>

const initialState = {} as SecureStorageState

export const secureStorageSlice = createSlice({
  name: ReduxKey.secureStorage,
  initialState,
  reducers: {
    setSecureItemUpdatedTimestamp: (
      state,
      {payload}: PayloadAction<SecureItemKey>,
    ) => {
      Object.assign(state, {[payload]: Date.now()})
    },
    deleteSecureItemUpdatedTimestamp: (
      state,
      {payload}: PayloadAction<SecureItemKey>,
    ) => {
      if (state[payload]) {
        delete state[payload]
      }
    },
    reset: () => initialState,
  },
})

export const {deleteSecureItemUpdatedTimestamp, setSecureItemUpdatedTimestamp} =
  secureStorageSlice.actions

export const selectSecureItemUpdatedTimestamp =
  (key: SecureItemKey) => (state: RootState) =>
    state[ReduxKey.secureStorage][key]

export const useSetSecureItemUpdatedTimestamp = () => {
  const dispatch = useDispatch()

  const deleteItem = useCallback(
    (key: SecureItemKey) => dispatch(deleteSecureItemUpdatedTimestamp(key)),
    [dispatch],
  )
  const setItem = useCallback(
    (key: SecureItemKey) => dispatch(setSecureItemUpdatedTimestamp(key)),
    [dispatch],
  )

  return {deleteItem, setItem}
}
