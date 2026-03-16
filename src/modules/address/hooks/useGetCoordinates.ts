import {useCallback} from 'react'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Geolocation, {GeoOptions} from 'react-native-geolocation-service'
import {requestLocationAccuracy} from 'react-native-permissions'
import type {Coordinates} from '@/types/location'
import {usePermission} from '@/hooks/permissions/usePermission'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {Permissions} from '@/types/permissions'
import {isVersionHigherOrEqual} from '@/utils/versionCompare'

const LOCATION_ACCURACY_IOS_VERSION = '14'

const defaultOptions: GeoOptions = {
  forceLocationManager: false,
  forceRequestLocation: false,
  enableHighAccuracy: true,
  maximumAge: 10000,
  showLocationDialog: true,
  timeout: 60000,
  accuracy: {
    ios: 'best',
    android: 'high',
  },
}

/**
 * Returns a promise of the current position (location) of the user. Will request the permission if necessary and will handle error logging if requesting the position fails.
 */
export const useGetCoordinates = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const trackException = useTrackException()
  const {hasPermission} = usePermission(Permissions.location)

  return useCallback(
    (options?: Partial<GeoOptions>) =>
      new Promise<Coordinates | undefined>(async (resolve, reject) => {
        if (!hasPermission) {
          reject({isTechnicalError: false})

          return
        }

        if (
          highAccuracyPurposeKey &&
          Platform.OS === 'ios' &&
          isVersionHigherOrEqual(
            DeviceInfo.getSystemVersion(),
            LOCATION_ACCURACY_IOS_VERSION,
          )
        ) {
          await requestLocationAccuracy({
            purposeKey: highAccuracyPurposeKey,
          })
        }

        Geolocation.getCurrentPosition(
          ({coords: {latitude, longitude}}) => {
            const coordinates = {
              lat: latitude,
              lon: longitude,
            }

            resolve(coordinates)
          },
          error => {
            trackException(
              ExceptionLogKey.coordinates,
              'useGetCoordinates.ts',
              {error},
            )
            reject({isTechnicalError: true})
          },
          {
            ...defaultOptions,
            ...options,
          },
        )
      }),
    [hasPermission, highAccuracyPurposeKey, trackException],
  )
}
