import {useCallback, type RefObject} from 'react'
import MapView from 'react-native-maps'
import {
  ANIMATION_DURATION,
  USER_LOCATION_DELTA,
} from '@/components/features/map/constants'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {
  requestLocationFetch,
  useLocation,
  useLocationType,
} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {Permissions} from '@/types/permissions'

export const useFocusOnUserLocation = (
  moduleSlug: ModuleSlug,
  map: RefObject<MapView | null>,
) => {
  const dispatch = useDispatch()
  const {locationFetchRequested, location, isGettingLocation} = useLocation()
  const locationType = useLocationType(moduleSlug)
  const setLocationType = useSetLocationType(moduleSlug)

  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )

  const initLocation = useCallback(async () => {
    const permission = await requestLocationPermission()

    if (!permission) {
      return
    }

    if (!locationFetchRequested && !isGettingLocation) {
      dispatch(requestLocationFetch())
    }

    if (locationType !== 'location') {
      setLocationType('location')
    }
  }, [
    requestLocationPermission,
    dispatch,
    setLocationType,
    locationFetchRequested,
    isGettingLocation,
    locationType,
  ])

  return useCallback(async () => {
    await initLocation()

    if (!location?.coordinates) {
      return
    }

    map.current?.animateToRegion(
      {
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lon,
        latitudeDelta: USER_LOCATION_DELTA,
        longitudeDelta: USER_LOCATION_DELTA,
      },
      ANIMATION_DURATION,
    )
  }, [map, location, initLocation])
}
