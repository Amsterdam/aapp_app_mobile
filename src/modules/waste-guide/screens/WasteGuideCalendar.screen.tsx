import {Screen} from '@/components/features/screen/Screen'
import {WasteGuideCalendar} from '@/modules/waste-guide/components/calendar/WasteGuideCalendar'
import {WasteGuideCalendarMenu} from '@/modules/waste-guide/components/WasteGuideCalendarMenu'

export const WasteGuideCalendarScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={<WasteGuideCalendarMenu />}
    testID="WasteGuideCalendarScreen">
    <WasteGuideCalendar />
  </Screen>
)
