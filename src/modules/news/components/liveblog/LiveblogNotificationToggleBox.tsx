import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
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

  const [postLiveblogNotification] = useNewsPostLiveblogNotificationsMutation()
  const [deleteLiveblogNotification] =
    useNewsDeleteLiveblogNotificationsMutation()

  const onChange = useCallback(
    (value: boolean) => {
      if (value) {
        void postLiveblogNotification(articleId)
      } else {
        void deleteLiveblogNotification(articleId)
      }
    },
    [deleteLiveblogNotification, postLiveblogNotification, articleId],
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
