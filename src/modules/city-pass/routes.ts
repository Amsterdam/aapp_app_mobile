import type {RedirectErrorCodes} from '@/types/mijnAmsterdam'
import type {LoginResult} from '@/types/navigation'
import {CityPass, CityPassBudget} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassBlockPass = 'CityPassBlockPass',
  cityPassDetails = 'CityPassDetails',
  cityPassLogout = 'CityPassLogout',
  cityPasses = 'CityPasses',
  dashboard = 'Dashboard',
  forgotAccessCode = 'ForgotAccessCode',
  login = 'Login',
  loginSteps = 'LoginSteps',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passNumber: CityPass['passNumber']}
  [CityPassRouteName.cityPassLogout]: undefined
  [CityPassRouteName.cityPasses]: {index?: number}
  [CityPassRouteName.dashboard]: undefined
  [CityPassRouteName.budget]: {
    budgetCode: CityPassBudget['code']
    passNumber: CityPass['passNumber']
  }
  [CityPassRouteName.login]: undefined
  [CityPassRouteName.loginSteps]:
    | {
        accessToken?: string
        'amp;errorCode'?: string
        errorCode?: RedirectErrorCodes
        errorMessage?: string
        loginResult?: LoginResult
        refreshToken?: string
      }
    | undefined
  [CityPassRouteName.forgotAccessCode]: undefined
  [CityPassRouteName.securityCode]: {id: CityPass['id']}
  [CityPassRouteName.cityPassBlockPass]: {passNumber: CityPass['passNumber']}
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
