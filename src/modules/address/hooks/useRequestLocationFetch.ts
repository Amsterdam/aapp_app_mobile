import {useCallback, useEffect} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {requestLocationFetch, useLocationType} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const useRequestLocationFetch = (
  moduleSlug: ModuleSlug,
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()
  const locationType = useLocationType(moduleSlug)

  const startLocationFetch = useCallback(
    () => dispatch(requestLocationFetch(highAccuracyPurposeKey)),
    [dispatch, highAccuracyPurposeKey],
  )

  useEffect(() => {
    if (locationType === 'location') {
      startLocationFetch()
    }
  }, [locationType, startLocationFetch])

  return {startLocationFetch}
}
