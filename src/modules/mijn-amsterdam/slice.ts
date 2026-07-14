import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {ModuleSlug} from '@/modules/slugs'
import {useSelector} from '@/hooks/redux/useSelector'
import {ModuleStatus, type ModuleServerConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  cachedThemes?: ModuleServerConfig[]
  isLoggedIn: boolean
  profileName?: string
  shouldShowBanner: boolean
}

const initialState: MijnAmsterdamState = {
  cachedThemes: undefined,
  isLoggedIn: false,
  profileName: undefined,
  shouldShowBanner: true,
}

export const mijnAmsterdamSlice = createSlice({
  name: ReduxKey.mijnAmsterdam,
  initialState,
  reducers: {
    setCachedThemes: (
      state,
      {payload: newCachedThemes}: PayloadAction<ModuleServerConfig[]>,
    ) => {
      state.cachedThemes = newCachedThemes.map(theme => ({
        ...theme,
        isMams: true,
      }))
    },
    setIsLoggedIn: (
      state,
      {
        payload: {isLoggedIn, profileName},
      }: PayloadAction<{isLoggedIn: boolean; profileName?: string}>,
    ) => {
      if (state.isLoggedIn && isLoggedIn === false) {
        // If previous logged in state is true and now becomes false, banner should show again.
        state.shouldShowBanner = true
      }

      state.isLoggedIn = isLoggedIn

      if (isLoggedIn) {
        state.profileName = profileName
        state.shouldShowBanner = false
      } else {
        state.profileName = undefined
      }
    },
    setShouldShowBanner: (
      state,
      {payload: shouldShowBanner}: PayloadAction<boolean>,
    ) => {
      state.shouldShowBanner = shouldShowBanner
    },
  },
})

export const {setCachedThemes, setIsLoggedIn, setShouldShowBanner} =
  mijnAmsterdamSlice.actions

export const selectIsLoggedIn = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].isLoggedIn

export const selectProfileName = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].profileName

export const selectShouldShowBanner = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].shouldShowBanner

export const selectCachedThemes = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].cachedThemes

export const useGetCachedTheme = (slug: ModuleSlug) => {
  const cachedThemes = useSelector(selectCachedThemes)

  const cachedTheme = cachedThemes?.find(theme => theme.moduleSlug === slug)

  const isInactive = cachedTheme?.status === ModuleStatus.inactive

  return {cachedTheme, isInactive}
}
