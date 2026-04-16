import {useLinkTo} from '@react-navigation/native'
import {useCallback, type ReactNode} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {resolveModuleOnNotificationEvent} from '@/app/navigation/utils/resolveModuleOnNotificationEvent'
import {resolveModulePathFromNotification} from '@/app/navigation/utils/resolveModulePathFromNotification'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {type Notification} from '@/modules/notification-history/types'
import {notificationToPushNotification} from '@/modules/notification-history/utils/notificationToPushNotification'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {stripAppPrefixFromRoute} from '@/utils/stripAppPrefixFromRoute'

type Props = {
  children: ReactNode
  createdAt: string
  notification: Notification
}

export const NotificationHistoryItemPressable = ({
  children,
  createdAt,
  notification,
}: Props) => {
  const dispatch = useDispatch()
  const {body, context, id, module_slug, title, is_read} = notification
  const {navigate} = useNavigation()
  const openUrl = useOpenUrl()
  const transformedNotification = notificationToPushNotification(notification)

  const linkTo = useLinkTo()

  const onNotificationPress = useCallback(() => {
    if (context.url) {
      return openUrl(context.url)
    }

    resolveModuleOnNotificationEvent(transformedNotification, dispatch)

    const linkPath = resolveModulePathFromNotification(
      transformedNotification,
      false,
    )

    if (linkPath) {
      linkTo(linkPath)

      return
    }

    const deeplinkUrl = stripAppPrefixFromRoute(context.deeplink)

    if (deeplinkUrl) {
      navigate(deeplinkUrl.split('/').pop() as ModuleSlug) // When navigation fails because of an unknown route, user navigates to home. Handled in AppNavigationContainer.tsx

      return
    }

    if (module_slug) {
      navigate(module_slug as ModuleSlug)
    }
  }, [
    context.deeplink,
    context.url,
    dispatch,
    linkTo,
    module_slug,
    navigate,
    openUrl,
    transformedNotification,
  ])

  return (
    <PressableBase
      accessibilityLabel={accessibleText(
        is_read ? '' : 'Ongelezen bericht: ',
        title,
        body,
        `ontvangen: ${createdAt}`,
        context.url ? 'Opent in webbrowser.' : '',
      )}
      onPress={onNotificationPress}
      testID={`NotificationHistoryItem${id}Button`}>
      {children}
    </PressableBase>
  )
}
