import notifee from '@notifee/react-native'
import {
  FirebaseMessagingTypes,
  getMessaging,
} from '@react-native-firebase/messaging'
import {useEffect} from 'react'
import {useAppState} from '@/hooks/useAppState'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

/** display a notification when the app is in foreground-state
 * will be listened for in the useForegroundPushNotificationHandler hook which handles
 * the navigation.
 **/
export const useDisplayNotificationOnAppForeground = () => {
  const {trackCustomEvent} = useTrackEvents()
  const {refetch} = useGetNotificationsQuery()

  useAppState({
    onForeground: () => {
      void refetch()
    },
  })

  useEffect(() => {
    const onMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
      void refetch()
      /**
       * example message:
       * Android:
      {
        collapseKey: 'nl.amsterdam.app.dev',
        data: {
          linkSourceid: '20',
          type: 'ProjectWarningCreatedByProjectManager',
        },
        from: '346299586823',
        messageId: '0:1717589352922991%cb56d100cb56d100',
        notification: {
          android: {},
          body: 'foreground',
          title: 'Test project voor team communicare',
        },
        sentTime: 1717589352915,
        ttl: 2419200,
      }

      * iOS:
      {
        data: {
          linkSourceid: '20',
          type: 'ProjectWarningCreatedByProjectManager',
        },
        from: '346299586823',
        messageId: '1717589352953305',
        notification: {
          body: 'foreground',
          title: 'Test project voor team communicare',
        },
      }
      */

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      })

      if (message.notification) {
        void notifee
          .displayNotification({
            title: message.notification.title,
            body: message.notification.body,
            android: {
              channelId,
              pressAction: {id: 'default'},
            },
            data: message.data,
          })
          .then(() => {
            trackCustomEvent(
              'push-notification',
              PiwikAction.pushNotificationDisplay,
              {
                [PiwikDimension.pushTitle]: message.notification?.title,
                [PiwikDimension.pushContent]: message.notification?.body,
              },
            )
          })
      }
    }

    return getMessaging().onMessage(onMessage)
  }, [refetch, trackCustomEvent])
}
