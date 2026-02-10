import {useCallback} from 'react'
import {FlatList, type ListRenderItem} from 'react-native'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useModules} from '@/hooks/useModules'
import {NotificationHistoryItem} from '@/modules/notification-history/components/NotificationHistoryItem'
import {NotificationHistoryListFooter} from '@/modules/notification-history/components/NotificationHistoryListFooter'
import {useMarkAllNotificationsReadMutation} from '@/modules/notification-history/service'
import {
  GetNotificationsResult,
  type Notification,
} from '@/modules/notification-history/types'

type Props = {
  data?: GetNotificationsResult
}

export const NotificationHistoryList = ({data}: Props) => {
  const {enabledModules} = useModules()

  const renderItem = useCallback<ListRenderItem<Notification>>(
    ({item}) => (
      <NotificationHistoryItem
        enabledModules={enabledModules}
        item={item}
      />
    ),
    [enabledModules],
  )
  const [markAllNotificationsRead, {}] = useMarkAllNotificationsReadMutation()

  useBlurEffect(() => {
    void markAllNotificationsRead()
  })

  return (
    <FlatList
      data={data}
      keyExtractor={({id}) => id}
      ListFooterComponent={NotificationHistoryListFooter}
      renderItem={renderItem}
    />
  )
}
