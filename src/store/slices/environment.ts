import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Environment, getApi, ApiSlug, customDefaultUrls} from '@/environment'
import {isDevApp} from '@/processes/development'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type EnvironmentState = {
  custom: typeof customDefaultUrls
  environment: Environment
}

export const environmentSlice = createSlice({
  name: ReduxKey.environment,
  initialState: {
    custom: customDefaultUrls,
    environment: isDevApp ? Environment.acceptance : Environment.production,
  } as EnvironmentState,
  reducers: {
    setEnvironment: (state, {payload}: PayloadAction<Environment>) => {
      state.environment = payload
    },
    setCustomEnvironment: (
      state,
      {payload}: PayloadAction<Partial<typeof customDefaultUrls>>,
    ) => {
      state.custom = {...state.custom, ...payload}
    },
  },
})

export const {setEnvironment, setCustomEnvironment} = environmentSlice.actions

export const selectEnvironment = (state: RootState) =>
  state[ReduxKey.environment]

export const selectApi =
  (api: ApiSlug, apiVersionPath?: string, protocol?: string) =>
  (state: RootState) =>
    getApi(
      state[ReduxKey.environment].environment,
      state[ReduxKey.environment].custom,
      api,
      apiVersionPath,
      protocol,
    )
