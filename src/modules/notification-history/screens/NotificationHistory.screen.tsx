import {Screen} from '@/components/features/screen/Screen'
import {NotificationHistory} from '@/modules/notification-history/components/NotificationHistory'
import {NotificationHistoryBanner} from '@/modules/notification-history/components/NotificationHistoryBanner'

export const NotificationHistoryScreen = () => (
  <Screen
    scroll={false}
    testID="NotificationHistoryScreen">
    <NotificationHistoryBanner />
    <NotificationHistory />
  </Screen>
)
