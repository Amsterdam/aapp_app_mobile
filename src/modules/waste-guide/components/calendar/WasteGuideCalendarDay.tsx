import {useMemo} from 'react'
import type {Dayjs} from 'dayjs'
import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarCell} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarCell'
import {
  EmptyWasteGuideCalendarDayEvents,
  WasteGuideCalendarDayEvents,
} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDayEvents'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {useCalendar} from '@/modules/waste-guide/hooks/useCalendar'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

export const WasteGuideCalendarDay = ({day}: {day: Dayjs | null}) => {
  const calendar = useCalendar()

  const eventsByDate = useMemo(
    () => getCalendarEventsByDate(calendar || []),
    [calendar],
  )

  const {
    accessibilityLabel,
    emphasis,
    secondary,
    dayEvents = [],
  } = useMemo(() => {
    if (!day) {
      return {}
    }

    const events = eventsByDate[day.format('YYYY-MM-DD')]
    const isTomorrowDay = isTomorrow(day)
    const isTodayDay = isToday(day)
    const isWeekendDay = day.day() === 6 || day.day() === 0

    const label = [
      day.format('dddd D MMMM'),
      isTodayDay && 'vandaag',
      isTomorrowDay && 'morgen',
      events?.length
        ? events.map(event => event.label).join(', ')
        : 'Geen ophaaldag',
    ]
      .filter(Boolean)
      .join(', ')

    return {
      accessibilityLabel: label,
      emphasis: isTodayDay,
      secondary: isWeekendDay,
      dayEvents: events,
    }
  }, [day, eventsByDate])

  return (
    <WasteGuideCalendarCell
      accessibilityLabel={accessibilityLabel}
      emphasis={emphasis}>
      {!!day && (
        <>
          <Phrase
            accessible={false}
            color={secondary ? 'secondary' : undefined}
            emphasis={emphasis ? 'strong' : undefined}>
            {day.date()}
          </Phrase>
          {dayEvents?.length ? (
            <WasteGuideCalendarDayEvents dayEvents={dayEvents} />
          ) : (
            <EmptyWasteGuideCalendarDayEvents />
          )}
        </>
      )}
    </WasteGuideCalendarCell>
  )
}
