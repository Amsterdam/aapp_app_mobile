import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useLocationType} from '@/modules/address/exports/hooks/useLocationType'
import {HighAccuracyPurposeKey} from '@/modules/address/exports/types'
import {requestLocationFetch} from '@/modules/address/slice'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

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
