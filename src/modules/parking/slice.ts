import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import type {
  ParkingAccount,
  ParkingAccountLogin,
  ParkingApiVersion,
} from '@/modules/parking/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type ParkingState = {
  accessTokens: Record<
    string,
    {accessToken: string; accessTokenExpiration: string}
  >
  accounts: Record<string, ParkingAccount>
  currentAccount?: string
  currentApiVersion?: ParkingApiVersion
  currentPermitReportCode?: string
  deeplinkAccount?: ParkingAccountLogin
  isLoggingIn: boolean
  isLoggingOut: boolean
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  /**
   * Determines whether any screen before the login screen should be skipped so the user automatically navigates to the login screen.
   */
  shouldShowLoginScreen: boolean
  visitorVehicleId?: string
  walletBalanceIncreaseStartBalance?: number
  walletBalanceIncreaseStartedAt?: string
}

const initialState: ParkingState = {
  accessTokens: {},
  accounts: {},
  currentAccount: undefined,
  currentApiVersion: undefined,
  currentPermitReportCode: undefined,
  deeplinkAccount: undefined,
  isLoggingIn: false,
  isLoggingOut: false,
  isLoginStepsActive: false,
  shouldShowLoginScreen: false,
  visitorVehicleId: undefined,
  walletBalanceIncreaseStartBalance: undefined,
  walletBalanceIncreaseStartedAt: undefined,
}

export const parkingSlice = createSlice({
  name: ReduxKey.parking,
  initialState,
  reducers: {
    removeParkingAccount: state => {
      if (!state.currentAccount) {
        return
      }

      delete state.accessTokens[state.currentAccount]
      delete state.accounts[state.currentAccount]
      state.currentAccount = Object.keys(state.accounts)[0]
      state.currentPermitReportCode = undefined
      state.visitorVehicleId = undefined
    },
    setAccessToken: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string
        accessTokenExpiration: string
        reportCode: string
      }>,
    ) => {
      state.accessTokens[payload.reportCode] = {
        accessToken: payload.accessToken,
        accessTokenExpiration: payload.accessTokenExpiration,
      }
    },
    setCurrentAccount: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.currentAccount = payload
    },
    setCurrentAccountByPermitReportCode: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      const currentAccount = Object.entries(state.accounts).find(
        ([_accountReportCode, account]) =>
          account.permits?.some(permit => permit.report_code === payload),
      )?.[0]

      if (currentAccount) {
        state.currentAccount = currentAccount
      }
    },
    setCurrentApiVersion: (
      state,
      {payload}: PayloadAction<ParkingApiVersion | undefined>,
    ) => {
      state.currentApiVersion = payload
    },
    setCurrentPermitReportCode: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.currentPermitReportCode = payload
    },
    setDeeplinkAccount: (
      state,
      {payload}: PayloadAction<ParkingAccountLogin | undefined>,
    ) => {
      state.deeplinkAccount = payload
    },
    setIsLoggingIn: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoggingIn = payload
    },
    setIsLoggingOut: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoggingOut = payload
    },
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowLoginScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowLoginScreen = payload
    },
    setVisitorVehicleId: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.visitorVehicleId = payload
    },
    setParkingAccount: (state, {payload}: PayloadAction<ParkingAccount>) => {
      state.accounts[payload.reportCode] = payload
    },
    setParkingAccountPermits: (
      state,
      {payload}: PayloadAction<ParkingAccount['permits']>,
    ) => {
      if (!state.currentAccount) {
        return
      }

      state.accounts[state.currentAccount].permits = payload
    },
    setWalletBalanceIncreaseStartedAt: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.walletBalanceIncreaseStartedAt = payload
    },
    setWalletBalanceIncreaseStartBalance: (
      state,
      {payload}: PayloadAction<number | undefined>,
    ) => {
      state.walletBalanceIncreaseStartBalance = payload
    },
  },
})

export const {
  setCurrentApiVersion,
  setCurrentPermitReportCode,
  setCurrentAccountByPermitReportCode,
  setDeeplinkAccount,
  setIsLoggingIn,
  setIsLoggingOut,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,
  setWalletBalanceIncreaseStartBalance,
  setWalletBalanceIncreaseStartedAt,
} = parkingSlice.actions

export const selectAccessToken = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accessTokens[
        state[ReduxKey.parking].currentAccount
      ]?.accessToken
    : undefined

export const selectAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accessTokens[
        state[ReduxKey.parking].currentAccount
      ]?.accessTokenExpiration
    : undefined

export const selectCurrentApiVersion = (state: RootState) =>
  state[ReduxKey.parking].currentApiVersion

export const selectCurrentPermitReportCode = (state: RootState) =>
  state[ReduxKey.parking].currentPermitReportCode

export const selectDeeplinkAccount = (state: RootState) =>
  state[ReduxKey.parking].deeplinkAccount

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.parking].isLoginStepsActive

export const selectIsLoggingIn = (state: RootState) =>
  state[ReduxKey.parking].isLoggingIn

export const selectIsLoggingOut = (state: RootState) =>
  state[ReduxKey.parking].isLoggingOut

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.parking].shouldShowLoginScreen

export const selectVisitorVehicleId = (state: RootState) =>
  state[ReduxKey.parking].visitorVehicleId

export const selectParkingAccounts = (state: RootState) =>
  state[ReduxKey.parking].accounts

export const selectParkingAccount = (state: RootState) =>
  state[ReduxKey.parking].currentAccount
    ? state[ReduxKey.parking].accounts[state[ReduxKey.parking].currentAccount]
    : undefined

export const selectCurrentParkingAccount = (state: RootState) =>
  state[ReduxKey.parking].currentAccount

export const selectWalletBalanceIncreaseStartedAt = (state: RootState) =>
  state[ReduxKey.parking].walletBalanceIncreaseStartedAt

export const selectWalletBalanceIncreaseStartBalance = (state: RootState) =>
  state[ReduxKey.parking].walletBalanceIncreaseStartBalance

// split selectors and dispatch
export const useParkingAccessToken = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const accessTokenExpiration = useSelector(selectAccessTokenExpiration)

  const setAccessToken = useCallback(
    (reportCode: string, token: string, expiration: string) =>
      dispatch(
        parkingSlice.actions.setAccessToken({
          reportCode,
          accessToken: token,
          accessTokenExpiration: expiration,
        }),
      ),
    [dispatch],
  )

  return {
    accessToken,
    setAccessToken,
    accessTokenExpiration,
  }
}

export const useParkingDeeplinkAccount = () =>
  useSelector(selectDeeplinkAccount)
export const useParkingAccount = () => useSelector(selectParkingAccount)
export const useParkingAccounts = () => useSelector(selectParkingAccounts)

export const useParkingAccountIsLoggingIn = () => useSelector(selectIsLoggingIn)

export const useParkingAccountIsLoggingOut = () =>
  useSelector(selectIsLoggingOut)

export const useCurrentParkingPermitReportCode = () =>
  useSelector(selectCurrentPermitReportCode)

export const useCurrentParkingAccount = () =>
  useSelector(selectCurrentParkingAccount)

export const useWalletBalanceIncreaseStartedAt = () => {
  const value = useSelector(selectWalletBalanceIncreaseStartedAt)

  return value ? dayjs(value) : undefined
}

export const useWalletBalanceIncreaseStartBalance = () =>
  useSelector(selectWalletBalanceIncreaseStartBalance)

export const useVisitorVehicleId = () => {
  const dispatch = useDispatch()
  const visitorVehicleId = useSelector(selectVisitorVehicleId)

  const setVisitorVehicleId = useCallback(
    (vehicleId: string | undefined) =>
      dispatch(parkingSlice.actions.setVisitorVehicleId(vehicleId)),
    [dispatch],
  )

  return {visitorVehicleId, setVisitorVehicleId}
}
