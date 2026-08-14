import {createContext} from 'react'

export const AccessCodeContext = createContext<null | {
  hasForgotCodeScreen: boolean
}>(null)
