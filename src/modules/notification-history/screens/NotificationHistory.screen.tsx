import {Screen} from '@/components/features/screen/Screen'
import {NotificationHistory} from '@/modules/notification-history/components/NotificationHistory'

export const NotificationHistoryScreen = () => (
  <Screen
    scroll={false}
    testID="NotificationHistoryScreen">
    <NotificationHistory />
  </Screen>
)
