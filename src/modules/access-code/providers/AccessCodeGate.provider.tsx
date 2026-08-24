import {type ReactNode, useMemo} from 'react'
import {AccessCodeContext} from '@/modules/access-code/providers/AccessCodeGate.context'

type Props = {
  children: ReactNode
  hasForgotCodeScreen?: boolean
}
export const AccessCodeGateProvider = ({
  hasForgotCodeScreen = false,
  children,
}: Props) => (
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
