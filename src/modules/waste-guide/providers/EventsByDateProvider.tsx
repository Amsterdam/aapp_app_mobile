import {useMemo, type PropsWithChildren} from 'react'
import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {EventsByDateContext} from '@/modules/waste-guide/providers/EventsByDateContext'

export const EventsByDateProvider = ({
  children,
  calendar,
}: PropsWithChildren<{calendar: WasteGuideCalendarEvent[]}>) => {
  const value = useMemo(
    () => getCalendarEventsByDate(calendar || []),
    [calendar],
  )

  return (
    <EventsByDateContext.Provider value={value}>
      {children}
    </EventsByDateContext.Provider>
  )
}
