import {useCallback, useState} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {
  NOTIFICATION_ON_ERROR_MESSAGE,
  NOTIFICATION_OFF_ERROR_MESSAGE,
} from '@/constants/notifications'
import {
  useNewsDeleteLiveblogNotificationsMutation,
  useNewsGetLiveblogNotificationsQuery,
  useNewsPostLiveblogNotificationsMutation,
} from '@/modules/news/service'

type Props = {
  articleId: number
}

export const LiveblogNotificationToggleBox = ({articleId}: Props) => {
  const {isLoading, isSuccess, data} =
    useNewsGetLiveblogNotificationsQuery(articleId)

  const [postLiveblogNotification, {isLoading: isPosting}] =
    useNewsPostLiveblogNotificationsMutation()
  const [deleteLiveblogNotification, {isLoading: isDeleting}] =
    useNewsDeleteLiveblogNotificationsMutation()
  const [error, setError] = useState<string | undefined>(undefined)

  const onChange = useCallback(
    (value: boolean) => {
      setError(undefined)

      if (value) {
        void postLiveblogNotification(articleId)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_ON_ERROR_MESSAGE)
          })
      } else {
        void deleteLiveblogNotification(articleId)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_OFF_ERROR_MESSAGE)
          })
      }
    },
    [deleteLiveblogNotification, postLiveblogNotification, articleId],
  )

  return (
    <NotificationToggleBox
      description="U krijgt een melding bij een nieuw bericht."
      disabled={isLoading || isPosting || isDeleting}
      error={error}
      loading={isLoading || isPosting || isDeleting}
      onChange={onChange}
      testID="NewsLiveblogNotificationSwitch"
      value={!!isSuccess && !!data?.id}
    />
  )
}
