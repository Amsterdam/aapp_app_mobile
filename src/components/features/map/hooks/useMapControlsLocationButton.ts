import {useCallback} from 'react'
import type {IconProps} from '@/components/ui/media/Icon'
import type {ModuleSlug} from '@/modules/slugs'
import {useMap} from '@/components/features/map/hooks/useMap'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {Permissions} from '@/types/permissions'

const getIconLocation = (
  isSetLocation: boolean,
  isFetching: boolean,
): IconProps => {
  if (isFetching) {
    return {name: 'spinner'}
  }

  if (isSetLocation) {
    return {name: 'gps-ios', isFilled: true}
  }

  return {name: 'gps-ios'}
}

export const useMapControlsLocationButton = (moduleSlug: ModuleSlug) => {
  const {locationType, isFetching, address} = useSelectedAddress(moduleSlug)
  const setLocationType = useSetLocationType(moduleSlug)

  const {map} = useMap()
  const {requestPermission: requestLocationPermission} = usePermission(
    Permissions.location,
  )
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )

  const {startLocationFetch} = useRequestLocationFetch(moduleSlug)

  const isSetLocation = locationType === 'location' && !!address?.coordinates

  const onPressLocationButton = useCallback(async () => {
    if (isSetLocation) {
      map?.animateToRegion(
        {
          latitude: address.coordinates!.lat,
          longitude: address.coordinates!.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      )

      return
    }

    const permission = await requestLocationPermission()

    startLocationFetch()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')
  }, [
    address?.coordinates,
    isSetLocation,
    startLocationFetch,
    map,
    navigateToInstructionsScreen,
    requestLocationPermission,
    setLocationType,
  ])

  const icon = getIconLocation(isSetLocation, isFetching)

  return {onPressLocationButton, icon}
}
