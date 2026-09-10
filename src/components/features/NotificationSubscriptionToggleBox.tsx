import {useCallback} from 'react'
import type {TestProps} from '@/components/ui/types'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
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
  const onChange = useCallback(
    (newValue: boolean) => {
      if (newValue && postParams && !('noValidParams' in postParams)) {
        void postNotificationSubscription(postParams)
      } else {
        void deleteNotificationSubscription(notificationSubscriptionType)
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
      onChange={onChange}
      testID={testID}
      value={!!isSuccess && data.status === 'success'}
    />
  )
}
