import {useCallback, useEffect} from 'react'
import {
  PermissionStatus,
  RESULTS,
  check,
  checkNotifications,
} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {CustomDimensions, PiwikAction} from '@/processes/piwik/types'

import {setPermission} from '@/store/slices/permissions'
import {
  ALL_PERMISSIONS_WITH_LOG_DIMENSION,
  Permissions,
} from '@/types/permissions'

const checkPermission = async (
  permission: Permissions,
): Promise<PermissionStatus | undefined> => {
  if (permission === Permissions.notifications) {
    const result = await checkNotifications()

    return result.status
  }

  if (permission) {
    return check(permission)
  }
}

export const useCheckPermissions = () => {
  const dispatch = useDispatch()
  const trackException = useTrackException()
  const {ready, trackCustomEvent} = useTrackEvents()

  const checkPermissions = useCallback(
    (action = PiwikAction.toForeground) => {
      void Promise.all(
        ALL_PERMISSIONS_WITH_LOG_DIMENSION.map(
          ({permission}) =>
            new Promise<boolean>(resolve => {
              checkPermission(permission)
                // eslint-disable-next-line sonarjs/no-nested-functions
                .then(result => {
                  const granted = result === RESULTS.GRANTED

                  dispatch(setPermission({permission, granted, status: result}))

                  resolve(granted)
                })
                // eslint-disable-next-line sonarjs/no-nested-functions
                .catch((error: unknown) => {
                  dispatch(setPermission({permission, granted: false}))

                  trackException(
                    ExceptionLogKey.updatePermission,
                    'useCheckPermissions.ts',
                    {error, permission, request: false},
                  )

                  resolve(false)
                })
            }),
        ),
      ).then((results: boolean[]) => {
        if (ready) {
          const dimensions = results.reduce<CustomDimensions>(
            (acc, granted, index) => ({
              ...acc,
              [ALL_PERMISSIONS_WITH_LOG_DIMENSION[index].logDimension]:
                granted.toString(),
            }),
            {},
          )

          trackCustomEvent('permissions', action, dimensions)
        }
      })
    },
    [dispatch, trackException, ready, trackCustomEvent],
  )

  useEffect(() => {
    checkPermissions(PiwikAction.startUp)
  }, [checkPermissions])

  useAppState({
    onForeground: checkPermissions,
  })
}
