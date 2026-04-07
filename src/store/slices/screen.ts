import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {Platform} from 'react-native'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ScreenState = {
  headerHeight: number
  /**
   * Used to hide screen content when overlay is open. Header is still shown.
   * This is used to prevent screen readers from reading the content behind the overlay.
   */
  isContentHiddenFromAccessibility: boolean
  /**
   * Used to hide screen content when overlay is open.
   * This is used to prevent screen readers from reading the content behind the overlay.
   */
  isHiddenFromAccessibility: boolean
  spaceBottom: number
}

const initialState = {
  spaceBottom: 0,
  isContentHiddenFromAccessibility: false,
  isHiddenFromAccessibility: false,
  headerHeight: 0,
}

export const screenSlice = createSlice({
  name: ReduxKey.screen,
  initialState,
  reducers: {
    resetScreen: () => initialState,
    setHideScreenFromAccessibility: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isHiddenFromAccessibility = payload
    },
    setHideScreenContentFromAccessibility: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isContentHiddenFromAccessibility = payload
    },
    setExtraSpaceBottom: (state, {payload}: PayloadAction<number>) => {
      state.spaceBottom = payload
    },
    setHeaderHeight: (state, {payload}: PayloadAction<number>) => {
      state.headerHeight = payload
    },
  },
})

export const {
  setExtraSpaceBottom,
  setHideScreenFromAccessibility,
  setHideScreenContentFromAccessibility,
  setHeaderHeight,
} = screenSlice.actions

export const selectScreenBottomExtraSpace = (state: RootState) =>
  state[ReduxKey.screen].spaceBottom

export const selectIsHiddenFromAccessibility = (state: RootState) =>
  state[ReduxKey.screen].isHiddenFromAccessibility && Platform.OS === 'ios' // on Android, setting importantForAccessibility to "no-hide-descendants" on the root view of the screen works to hide all content from accessibility, but on iOS we need to set this flag on each element, so we only set it when the screen is hidden from accessibility

export const selectIsContentHiddenFromAccessibility = (state: RootState) =>
  state[ReduxKey.screen].isContentHiddenFromAccessibility &&
  Platform.OS === 'ios' // on Android, setting importantForAccessibility to "no-hide-descendants" on the root view of the screen works to hide all content from accessibility, but on iOS we need to set it on each element, so we only set it when the screen content is hidden from accessibility

export const selectHeaderHeight = (state: RootState) =>
  state[ReduxKey.screen].headerHeight

export const useScreen = () => {
  const dispatch = useDispatch()

  const spaceBottom = useSelector(selectScreenBottomExtraSpace)
  const isContentHiddenFromAccessibility = useSelector(
    selectIsContentHiddenFromAccessibility,
  )
  const isHiddenFromAccessibility = useSelector(selectIsHiddenFromAccessibility)

  const setSpaceBottom = useCallback(
    (space: number) => dispatch(setExtraSpaceBottom(space)),
    [dispatch],
  )

  const setHideFromAccessibility = useCallback(
    (hide: boolean) => dispatch(setHideScreenFromAccessibility(hide)),
    [dispatch],
  )

  const setHideContentFromAccessibility = useCallback(
    (hide: boolean) => dispatch(setHideScreenContentFromAccessibility(hide)),
    [dispatch],
  )

  return {
    isContentHiddenFromAccessibility,
    isHiddenFromAccessibility,
    spaceBottom,
    setHideContentFromAccessibility,
    setHideFromAccessibility,
    setSpaceBottom,
  }
}
