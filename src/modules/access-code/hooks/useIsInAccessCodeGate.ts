import {use} from 'react'
import {AccessCodeGateContext} from '@/modules/access-code/providers/AccessCodeGate.context'

export const useIsInAccessCodeGate = () => {
  const isInsideGate = use(AccessCodeGateContext)

  if (typeof isInsideGate !== 'boolean') {
    throw new Error('Something is wrong here...')
  }

  return isInsideGate
}
