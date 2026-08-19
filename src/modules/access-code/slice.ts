import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {NavigateTo} from '@/app/navigation/types'
import {AccessCodeType} from '@/modules/access-code/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

const MAX_ATTEMPTS = 5

export type AccessCodeState = {
  attemptsLeft: number
  [AccessCodeType.codeEntered]: number[]
  [AccessCodeType.codeConfirmed]: number[]
  [AccessCodeType.codeSet]: number[]
  codeValidTimestamp?: number
  error?: string
  isCodeConfirmed: boolean
  isCodeSet: boolean
  isCodeValid: boolean
  isEnteringCode: boolean
  isForgotCode: boolean
  isLoginStepsActive: Array<ModuleSlug>
  /**
   * Used for when access code flow gets triggered mid-stack
   */
  pendingScreen?: NavigateTo
  useBiometrics?: boolean
}

const initialValue: AccessCodeState = {
  attemptsLeft: MAX_ATTEMPTS,
  [AccessCodeType.codeEntered]: [],
  [AccessCodeType.codeConfirmed]: [],
  [AccessCodeType.codeSet]: [],
  codeValidTimestamp: undefined,
  error: undefined,
  isCodeSet: false,
  isCodeConfirmed: false,
  isCodeValid: false,
  isEnteringCode: false,
  isForgotCode: false,
  useBiometrics: undefined,
  isLoginStepsActive: [],
}

export const accessCodeSlice = createSlice({
  name: 'accessCode',
  initialState: initialValue,
  reducers: {
    addDigit: (
      state,
      {
        payload: {digit, type},
      }: PayloadAction<{digit: number; type: AccessCodeType}>,
    ) => {
      state[type].push(digit)
    },
    removeDigit: (state, {payload: type}: PayloadAction<AccessCodeType>) => {
      state[type].pop()
    },
    reset: () => initialValue,
    setCode: (
      state,
      {
        payload: {code, type},
      }: PayloadAction<{code: number[]; type: AccessCodeType}>,
    ) => {
      state[type] = code
    },
    resetAttemptsLeft: state => {
      state.attemptsLeft = initialValue.attemptsLeft
    },
    setAttemptsLeft: (state, {payload}: PayloadAction<number>) => {
      state.attemptsLeft = payload
    },
    setError: (state, {payload}: PayloadAction<string | undefined>) => {
      state.error = payload
    },
    setIsCodeSet: (state, {payload}: PayloadAction<boolean>) => {
      state.isCodeSet = payload
    },
    setIsCodeConfirmed: (state, {payload}: PayloadAction<boolean>) => {
      state.isCodeConfirmed = payload
    },
    setIsCodeValid: (state, {payload}: PayloadAction<boolean>) => {
      if (payload) {
        state.isCodeValid = true
        state.codeValidTimestamp = Date.now()
      } else {
        state.isCodeValid = false
        state.codeValidTimestamp = undefined
      }
    },
    setIsEnteringCode: (state, {payload}: PayloadAction<boolean>) => {
      state.isEnteringCode = payload
    },
    setIsForgotCode: (state, {payload}: PayloadAction<boolean>) => {
      state.isForgotCode = payload
    },
    setLoginStepsActive: (
      state,
      {payload}: PayloadAction<[ModuleSlug, boolean]>,
    ) => {
      const [module, isActive] = payload

      const moduleSet = new Set<ModuleSlug>(state.isLoginStepsActive)

      if (isActive) {
        moduleSet.add(module)
      } else {
        moduleSet.delete(module)
      }

      state.isLoginStepsActive = [...moduleSet]
    },
    setPendingScreen: (
      state,
      {payload}: PayloadAction<NavigateTo | undefined>,
    ) => {
      state.pendingScreen = payload
    },
    setUseBiometrics: (state, {payload}: PayloadAction<boolean>) => {
      state.useBiometrics = payload
    },
  },
})

export const {
  reset,
  resetAttemptsLeft,
  setAttemptsLeft,
  setError,
  setIsCodeValid,
  setPendingScreen,
  setLoginStepsActive,
} = accessCodeSlice.actions

export const selectCodeEntered = (state: RootState) =>
  state[ReduxKey.accessCode].codeEntered

export const selectCodeSet = (state: RootState) =>
  state[ReduxKey.accessCode].codeSet

export const selectCodeConfirmed = (state: RootState) =>
  state[ReduxKey.accessCode].codeConfirmed

export const selectAttemptsLeft = (state: RootState) =>
  state[ReduxKey.accessCode].attemptsLeft

export const selectError = (state: RootState) =>
  state[ReduxKey.accessCode].error

export const selectIsCodeSet = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeSet

export const selectIsCodeConfirmed = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeConfirmed

export const selectIsCodeValid = (state: RootState) =>
  state[ReduxKey.accessCode].isCodeValid

export const selectIsEnteringCode = (state: RootState) =>
  state[ReduxKey.accessCode].isEnteringCode

export const selectIsForgotCode = (state: RootState) =>
  state[ReduxKey.accessCode].isForgotCode

export const selectCodeValidTimestamp = (state: RootState) =>
  state[ReduxKey.accessCode].codeValidTimestamp

export const selectUseBiometrics = (state: RootState) =>
  state[ReduxKey.accessCode].useBiometrics

export const selectIsLoginStepsActive = (
  state: RootState,
  moduleSlug: ModuleSlug,
) => state[ReduxKey.accessCode].isLoginStepsActive.includes(moduleSlug)

export const selectPendingScreen = (state: RootState) =>
  state[ReduxKey.accessCode].pendingScreen
