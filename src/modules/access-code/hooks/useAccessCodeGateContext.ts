import {use} from 'react'
import {AccessCodeContext} from '@/modules/access-code/providers/AccessCodeGate.context'

export const useAccessCodeGateContext = () => {
  const context = use(AccessCodeContext)

  return (
    context ?? {
      hasForgotCodeScreen: false,
    }
  )
}
