import {Screen} from '@/components/features/screen/Screen'
import {NotificationHistoryBanner} from '@/modules/mijn-amsterdam/exports/NotificationHistoryBanner'
import {NotificationHistory} from '@/modules/notification-history/components/NotificationHistory'

export const NotificationHistoryScreen = () => (
  <Screen
    scroll={false}
    testID="NotificationHistoryScreen">
    <NotificationHistoryBanner />
    <NotificationHistory />
  </Screen>
)
