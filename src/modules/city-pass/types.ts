import type {IconProps} from '@/components/ui/media/Icon'
import {TestProps} from '@/components/ui/types'
import {RedirectKey} from '@/modules/redirects/types'
import {ApiError} from '@/types/api'

export enum CityPassEndpointName {
  blockPass = 'blockPass',
  getAccessToken = 'getAccessToken',
  getBudgetTransactions = 'getBudgetTransactions',
  getCityPasses = 'getCityPasses',
  getDiscountTransactions = 'getDiscountTransactions',
  logout = 'logout',
  refreshToken = 'refreshToken',
}

export type AboutBlock = {
  icon: IconProps
  redirectKey: RedirectKey
  text: string
  title: string
} & TestProps

export enum TransactionType {
  budget = 'budget',
  discount = 'discount',
}

type TransactionBase = {
  datePublished: string
  datePublishedFormatted: string
  id: string
  /**
   * In GPass: aanbieding.communicatienaam
   */
  title: string
}

export type BudgetTransaction = TransactionBase & {
  amount: number
  amountFormatted: string
  budget: string
  budgetCode: string
}

export type DiscountTransaction = TransactionBase & {
  /** In GPass: aanbieding.omschrijving */
  description: string
  discountAmount: number
  discountAmountFormatted: string
  /**
   * In GPass: aanbieding.kortingszin
   */
  discountTitle: string
}

export type Transactions = BudgetTransaction[] | DiscountTransaction[]

export type CityPassBudget = {
  budgetAssigned: number
  budgetAssignedFormatted: string
  budgetBalance: number
  budgetBalanceFormatted: string
  code: string
  dateEnd: string
  dateEndFormatted: string
  description: string
  title: string
}

export type CityPassOwner = {
  firstname: string
  infix?: string
  initials: string
  lastname: string
}

export type CityPass = {
  actief: boolean
  balanceFormatted: string
  budgets: CityPassBudget[]
  dateEnd: string
  dateEndFormatted: string
  id: string
  owner: CityPassOwner
  passNumber: number
  passNumberComplete: string
  securityCode: string | null
}

export type CityPassPass = Pick<
  CityPass,
  'actief' | 'dateEndFormatted' | 'passNumberComplete'
> &
  Pick<CityPassOwner, 'firstname' | 'infix' | 'lastname'>

export type SecureCityPass = {
  a: CityPassPass['actief']
  d: CityPassPass['dateEndFormatted']
  f: CityPassPass['firstname']
  i?: CityPassPass['infix']
  l: CityPassPass['lastname']
  p: CityPassPass['passNumberComplete']
}

// api
export type CityPassTokensResponse = {
  access_token: string
  access_token_expiration: string
  refresh_token: string
  refresh_token_expiration: string
}

export type CityPassResponse = CityPass[]

export type TransactionsParams = {
  passNumber: CityPass['passNumber']
}

export type BudgetTransactionsParams = TransactionsParams & {
  budgetCode: CityPassBudget['code']
}

export type DiscountTransactionsResponse = {
  discountAmountTotal: number
  discountAmountTotalFormatted: string
  transactions: DiscountTransaction[]
}

export enum CityPassError401Codes {
  apiKeyInvalid = 'API_KEY_INVALID',
  tokenExpired = 'TOKEN_EXPIRED',
  tokenInvalid = 'TOKEN_INVALID',
  tokenNotReady = 'TOKEN_NOT_READY',
}

export enum RedirectErrorCodes {
  'Geen administratienummer gevonden' = '003',
  'Kon het administratienummer niet ophalen' = '002',
  'Niet ingelogd met Digid' = '001',
  'Onbekende error' = '000',
  'Verzenden van administratienummer naar de Amsterdam app niet gelukt' = '004',
}

export type CityPassApiError = ApiError<CityPassError401Codes>
