import type {Dayjs} from 'dayjs'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'

type Props = {
  days: Array<Dayjs | null>
  isFirstOfMonth?: boolean
  isLastRow?: boolean
}
export const WasteGuideCalendarWeek = ({
  days,
  isFirstOfMonth,
  isLastRow,
}: Props) => (
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
