import {type ReactNode, useMemo} from 'react'
import {AccessCodeContext} from '@/modules/access-code/providers/AccessCodeGate.context'

export const AccessCodeGateProvider = ({
  hasForgotCodeScreen = false,
  children,
}: {
  children: ReactNode
  hasForgotCodeScreen?: boolean
}) => (
  <AccessCodeContext.Provider
    value={useMemo(
      () => ({
        hasForgotCodeScreen,
      }),
      [hasForgotCodeScreen],
    )}>
    {children}
  </AccessCodeContext.Provider>
)
