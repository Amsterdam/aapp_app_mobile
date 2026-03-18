import type {Dayjs} from 'dayjs'
import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDayEvents} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDayEvents'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

export const WasteGuideCalenderWeek = ({
  days,
  isFirstOfMonth,
  isLastRow,
}: {
  days: Array<Dayjs | null>
  isFirstOfMonth?: boolean
  isLastRow?: boolean
}) => {
  const {wasteGuide} = useGetWasteGuide()
  const eventsByDate = getCalendarEventsByDate(wasteGuide?.calendar || [])

  return (
    <WasteGuideCalendarDaysRow
      isFirstOfMonth={isFirstOfMonth}
      isLastRow={isLastRow}>
      {days.map((day, dayIndex) => {
        if (!day) {
          return <WasteGuideCalendarDay key={dayIndex} />
        }

        const dayIsToday = isToday(day)
        const dayIsTomorrow = isTomorrow(day)
        const isWeekendDay = day.day() === 6 || day.day() === 0
        const dayEvents = eventsByDate[day.clone().format('YYYY-MM-DD')] || []
        const accessibilityLabel = `${day.format('dddd D MMMM')}, ${dayIsToday ? 'vandaag, ' : dayIsTomorrow ? 'morgen, ' : ''}${dayEvents.length > 0 ? dayEvents.map(event => event.label).join(', ') : 'Geen ophaaldag'}`

        return (
          <WasteGuideCalendarDay
            accessibilityLabel={accessibilityLabel}
            isAfter={false}
            isBeforeToday={false}
            isFirstWeekOfMonth={isFirstOfMonth}
            isToday={dayIsToday}
            key={dayIndex}>
            <Phrase
              accessible={false}
              color={isWeekendDay ? 'secondary' : undefined}
              emphasis={dayIsToday ? 'strong' : undefined}>
              {day.date()}
            </Phrase>
            <WasteGuideCalendarDayEvents dayEvents={dayEvents} />
          </WasteGuideCalendarDay>
        )
      })}
    </WasteGuideCalendarDaysRow>
  )
}
