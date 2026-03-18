import {Fragment} from 'react'
import type {Dayjs} from 'dayjs'
import {WasteGuideCalendarMonthTitle} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarMonthTitle'
import {WasteGuideCalenderWeek} from '@/modules/waste-guide/components/calendar/WasteGuideCalenderWeek'

export const WasteGuideCalenderMonth = ({
  month,
  weeks,
}: {
  month: string
  weeks: Record<number, Array<Dayjs | null>>
}) => (
  <Fragment>
    <WasteGuideCalendarMonthTitle monthName={month} />

    {Object.entries(weeks).map(([week, days], weekIndex) => (
      <WasteGuideCalenderWeek
        days={days}
        isFirstOfMonth={weekIndex === 0}
        isLastRow={weekIndex === Object.values(weeks).length - 1}
        key={week}
      />
    ))}
  </Fragment>
)
