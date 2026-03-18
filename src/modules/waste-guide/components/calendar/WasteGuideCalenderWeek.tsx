import type {Dayjs} from 'dayjs'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'

export const WasteGuideCalenderWeek = ({
  days,
  isFirstOfMonth,
  isLastRow,
}: {
  days: Array<Dayjs | null>
  isFirstOfMonth?: boolean
  isLastRow?: boolean
}) => (
  <WasteGuideCalendarDaysRow
    isFirstOfMonth={isFirstOfMonth}
    isLastRow={isLastRow}>
    {days.map((day, dayIndex) => (
      <WasteGuideCalendarDay
        day={day}
        key={day?.clone().toISOString() || dayIndex}
      />
    ))}
  </WasteGuideCalendarDaysRow>
)
