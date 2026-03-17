import {useState, useCallback, useEffect} from 'react'
import type {Coordinates} from '@/types/location'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCoordinates} from '@/modules/address/hooks/useGetCoordinates'
import {useLocation, setGetLocationIsError} from '@/modules/address/slice'
import {getPropertyFromMaybeObject} from '@/utils/object'

export const useGetCoordinatesForLocation = () => {
  const dispatch = useDispatch()
  const [coordinatesForLocation, setCoordinatesForLocation] = useState<
    Coordinates | undefined
  >()
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)
  const {locationFetchRequested, highAccuracyPurposeKey} = useLocation()
  const getCoordinates = useGetCoordinates(highAccuracyPurposeKey)

  const getCoordinatesForLocation = useCallback(async () => {
    try {
      setIsGettingCoordinates(true)
      const coordinates = await getCoordinates()

      setCoordinatesForLocation(coordinates)
    } catch (error) {
      const isTechnicalError = getPropertyFromMaybeObject(
        error,
        'isTechnicalError',
      )

      if (isTechnicalError) {
        dispatch(setGetLocationIsError(true))
      }
    } finally {
      setIsGettingCoordinates(false)
    }
  }, [dispatch, getCoordinates])

  useEffect(() => {
    if (locationFetchRequested) {
      void getCoordinatesForLocation()
    }
  }, [getCoordinatesForLocation, locationFetchRequested])

  return {
    coordinatesForLocation,
    getCoordinatesForLocation,
    isGettingCoordinates,
  }
}
