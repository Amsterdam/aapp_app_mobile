import {useCallback} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {ModuleSlug} from '@/modules/slugs'
import {useMap} from '@/components/features/map/hooks/useMap'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {Permissions} from '@/types/permissions'

const getIconNameLocation = (
  isSetLocation: boolean,
  isFetching: boolean,
): SvgIconName => {
  if (isFetching) {
    return 'spinner'
  }

  if (isSetLocation) {
    return 'gps-ios_filled'
  }

  return 'gps-ios'
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

  const iconName = getIconNameLocation(isSetLocation, isFetching)

  return {onPressLocationButton, iconName}
}
