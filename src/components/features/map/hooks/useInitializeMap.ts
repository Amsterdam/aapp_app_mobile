import {useCallback, useRef, useState, type RefObject} from 'react'
import MapView, {type UserLocationChangeEvent} from 'react-native-maps'
import {
  ANIMATION_DURATION,
  USER_LOCATION_DELTA,
} from '@/components/features/map/constants'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const useInitializeMap = (
  focusOnUser: boolean,
  map: RefObject<MapView | null>,
) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const hasFocused = useRef(false)

  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )

  const handleOnMapReady = useCallback(() => {
    setIsMapReady(true)

    if (focusOnUser) {
      void requestLocationPermission()
    }
  }, [focusOnUser, requestLocationPermission])

  const handleInitialUserLocation = useCallback(
    (e: UserLocationChangeEvent) => {
      if (!focusOnUser || !e.nativeEvent.coordinate || hasFocused.current) {
        return
      }

      map.current?.animateToRegion(
        {
          ...e.nativeEvent.coordinate,
          latitudeDelta: USER_LOCATION_DELTA,
          longitudeDelta: USER_LOCATION_DELTA,
        },
        ANIMATION_DURATION,
      )

      hasFocused.current = true
    },
    [focusOnUser, map],
  )

  return {
    onMapReady: handleOnMapReady,
    onUserLocationChange: handleInitialUserLocation,
    isMapReady,
  }
}
