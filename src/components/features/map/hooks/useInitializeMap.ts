import {useCallback, useRef, useState, type RefObject} from 'react'
import MapView, {type UserLocationChangeEvent} from 'react-native-maps'
import {
  ANIMATION_DURATION,
  USER_LOCATION_DELTA,
} from '@/components/features/map/constants'
import {MapFocus} from '@/components/features/map/types'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const useInitializeMap = (
  focusType: MapFocus,
  map: RefObject<MapView | null>,
) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const hasFocused = useRef(false)

  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )

  const handleOnMapReady = useCallback(() => {
    setIsMapReady(true)

    if (focusType === MapFocus.user) {
      void requestLocationPermission()
    }
  }, [focusType, requestLocationPermission])

  const handleInitialUserLocation = useCallback(
    (e: UserLocationChangeEvent) => {
      if (
        focusType !== MapFocus.user ||
        !e.nativeEvent.coordinate ||
        hasFocused.current
      ) {
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
    [focusType, map],
  )

  return {
    onMapReady: handleOnMapReady,
    onUserLocationChange: handleInitialUserLocation,
    isMapReady,
  }
}
