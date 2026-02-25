import {useCallback} from 'react'
import {
  PermissionStatus,
  RESULTS,
  request,
  requestNotifications,
} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {
  selectIsPermissionGranted,
  setPermission,
} from '@/store/slices/permissions'
import {Permissions} from '@/types/permissions'

const requestPermission = async (
  permission: Permissions,
): Promise<PermissionStatus | undefined> => {
  if (permission === Permissions.notifications) {
    const result = await requestNotifications([
      'alert',
      'badge',
      'carPlay',
      'sound',
    ])

    return result.status
  }

  if (permission) {
    return request(permission)
  }
}

export const usePermission = (permission: Permissions) => {
  const hasPermission = useSelector(selectIsPermissionGranted(permission))
  const dispatch = useDispatch()
  const trackException = useTrackException()

  const requestPermissionFn = useCallback(
    () =>
      new Promise<boolean>((resolve, reject) => {
        requestPermission(permission)
          .then(result => {
            const granted = result === RESULTS.GRANTED

            dispatch(setPermission({permission, granted, status: result}))
            resolve(granted)
          })
          .catch((error: unknown) => {
            dispatch(setPermission({permission, granted: false}))

            trackException(
              ExceptionLogKey.updatePermission,
              'usePermission.ts',
              {error, permission, request: true},
            )

            reject(error)
          })
      }),
    [dispatch, permission, trackException],
  )

  return {hasPermission, requestPermission: requestPermissionFn}
}
