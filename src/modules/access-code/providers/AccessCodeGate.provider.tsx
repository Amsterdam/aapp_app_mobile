import type {PropsWithChildren} from 'react'
import {AccessCodeGateContext} from '@/modules/access-code/providers/AccessCodeGate.context'

export const AccessCodeGateProvider = ({children}: PropsWithChildren) => (
  <AccessCodeGateContext value={true}>{children}</AccessCodeGateContext>
)
