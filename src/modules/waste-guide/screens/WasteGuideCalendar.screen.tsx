import {Screen} from '@/components/features/screen/Screen'
import {WasteGuideCalendarMenu} from '@/modules/waste-guide/components/WasteGuideCalendarMenu'
import {WasteGuideCalendar} from '@/modules/waste-guide/components/calendar/WasteGuideCalendar'

export const WasteGuideCalendarScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={<WasteGuideCalendarMenu />}
    testID="WasteGuideCalendarScreen">
    <WasteGuideCalendar />
  </Screen>
)
