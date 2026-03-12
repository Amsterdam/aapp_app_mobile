import {useEffect} from 'react'
import type {ServiceMapResponse} from '@/modules/service/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  setPropertiesToInclude,
  resetPropertiesToInclude,
} from '@/modules/service/slice'

export const usePropertiesToInclude = (
  properties_to_include?: ServiceMapResponse['properties_to_include'],
) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!properties_to_include) {
      return
    }

    dispatch(setPropertiesToInclude(properties_to_include))

    return () => {
      dispatch(resetPropertiesToInclude())
    }
  }, [properties_to_include, dispatch])
}
