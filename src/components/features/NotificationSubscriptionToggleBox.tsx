import {useCallback, useState} from 'react'
import type {TestProps} from '@/components/ui/types'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {
  NOTIFICATION_ON_ERROR_MESSAGE,
  NOTIFICATION_OFF_ERROR_MESSAGE,
} from '@/constants/notifications'
import {
  useGetNotificationSubscriptionQuery,
  usePostNotificationSubscriptionMutation,
  useDeleteNotificationSubscriptionMutation,
  type NotificationSubscriptionPostParams,
} from '@/services/notification.service'

type Props = {
  description: string
} & NotificationSubscriptionPostParams &
  TestProps

export const NotificationSubscriptionToggleBox = ({
  description,
  testID,
  ...postParams
}: Props) => {
  const {notificationSubscriptionType} = postParams
  const {isLoading, isSuccess, data} = useGetNotificationSubscriptionQuery(
    notificationSubscriptionType,
  )

  const [postNotificationSubscription] =
    usePostNotificationSubscriptionMutation()
  const [deleteNotificationSubscription] =
    useDeleteNotificationSubscriptionMutation()
  const [error, setError] = useState<string | undefined>(undefined)
  const onChange = useCallback(
    (newValue: boolean) => {
      setError(undefined)

      if (newValue && postParams && !('noValidParams' in postParams)) {
        void postNotificationSubscription(postParams)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_ON_ERROR_MESSAGE)
          })
      } else {
        void deleteNotificationSubscription(notificationSubscriptionType)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_OFF_ERROR_MESSAGE)
          })
      }
    },
    [
      deleteNotificationSubscription,
      notificationSubscriptionType,
      postNotificationSubscription,
      postParams,
    ],
  )

  return (
    <NotificationToggleBox
      description={description}
      disabled={!data || isLoading || data?.optimistic}
      error={error}
      loading={isLoading || data?.optimistic}
      onChange={onChange}
      testID={testID}
      value={!!isSuccess && data?.status === 'success'}
    />
  )
}
