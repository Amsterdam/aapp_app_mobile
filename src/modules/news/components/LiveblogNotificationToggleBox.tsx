import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {
  useNewsDeleteLiveBlogNotificationsMutation,
  useNewsGetLiveBlogNotificationsQuery,
  useNewsPostLiveBlogNotificationsMutation,
} from '@/modules/news/service'

type Props = {
  articleId: number
}

export const LiveblogNotificationToggleBox = ({articleId}: Props) => {
  const {isLoading, isSuccess, data} =
    useNewsGetLiveBlogNotificationsQuery(articleId)

  const [postLiveBlogNotification] = useNewsPostLiveBlogNotificationsMutation()
  const [deleteLiveBlogNotification] =
    useNewsDeleteLiveBlogNotificationsMutation()

  const onChange = useCallback(
    (value: boolean) => {
      if (value) {
        void postLiveBlogNotification(articleId)
      } else {
        void deleteLiveBlogNotification(articleId)
      }
    },
    [deleteLiveBlogNotification, postLiveBlogNotification, articleId],
  )

  return (
    <NotificationToggleBox
      description="U krijgt een melding bij een nieuw bericht."
      disabled={isLoading}
      onChange={onChange}
      testID="NewsLiveblogNotificationSwitch"
      value={!!isSuccess && !!data?.id}
    />
  )
}
