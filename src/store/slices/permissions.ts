import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PermissionStatus} from 'react-native-permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

export type PermissionsState = Partial<
  Record<Permissions, {granted: boolean; status?: PermissionStatus}>
>

const initialState: PermissionsState = {}

export const permissionsSlice = createSlice({
  name: ReduxKey.permissions,
  initialState,
  reducers: {
    setPermission: (
      state,
      {
        payload: {permission, granted, status},
      }: PayloadAction<{
        granted: boolean
        permission: Permissions
        status?: PermissionStatus
      }>,
    ) => {
      state[permission] = {
        granted,
        status,
      }
    },
  },
})

export const {setPermission} = permissionsSlice.actions

export const selectIsPermissionGranted =
  (permission: Permissions) => (state: RootState) =>
    state[ReduxKey.permissions][permission]?.granted ?? false

export const selectPermissions = (state: RootState) =>
  state[ReduxKey.permissions]
