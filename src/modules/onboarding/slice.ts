import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Onboarding} from '@/modules/onboarding/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type OnboardingState = Onboarding

const initialState: OnboardingState = {
  shouldShowOnboarding: true,
}

export const onboardingSlice = createSlice({
  name: ReduxKey.onboarding,
  initialState,
  reducers: {
    setShouldShowOnboarding: (
      state,
      {payload: shouldShow}: PayloadAction<boolean>,
    ) => {
      state.shouldShowOnboarding = shouldShow
    },
  },
})

export const {setShouldShowOnboarding} = onboardingSlice.actions

const selectShouldShowOnboarding = (state: RootState) =>
  state[ReduxKey.onboarding].shouldShowOnboarding

export const useShouldShowOnboarding = () =>
  useSelector(selectShouldShowOnboarding)
