import {buildRedirectPathFromNotificationUrl} from '@/app/navigation/buildRedirectPathFromNotificationUrl'
import {resolveModulePathFromNotification} from '@/app/navigation/utils/resolveModulePathFromNotification'
import {PushNotification} from '@/types/notification'
import {addAppPrefixToRoute} from '@/utils/addAppPrefixToRoute'

/**
 * Resolves a linking URL from a push notification, if possible.
 * @return 'amsterdam://...' URL or undefined if no valid URL could be derived
 */
export const resolvePathFromPushNotification = (
  pushNotification?: PushNotification,
) => {
  if (!pushNotification?.data) {
    return
  }

  const externalRoute =
    'url' in pushNotification.data ? pushNotification.data.url : undefined

  if (externalRoute) {
    return buildRedirectPathFromNotificationUrl(
      externalRoute,
      pushNotification?.title,
      pushNotification?.body,
    )
  }

  const route =
    addAppPrefixToRoute(
      resolveModulePathFromNotification(pushNotification, true),
    ) ??
    pushNotification.data.deeplink ?? // The deeplink already comes in with the app prefix
    addAppPrefixToRoute(pushNotification.data.module_slug)

  return route
}
