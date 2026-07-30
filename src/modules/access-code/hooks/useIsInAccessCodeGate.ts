import {use} from 'react'
import {AccessCodeGateContext} from '@/modules/access-code/providers/AccessCodeGate.context'

export const useIsInAccessCodeGate = () => use(AccessCodeGateContext)
