import {useMemo, type PropsWithChildren} from 'react'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {EventsByDateContext} from '@/modules/waste-guide/providers/EventsByDateContext'
import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

export const EventsByDateProvider = ({
  children,
  calendar,
}: PropsWithChildren<{calendar: WasteGuideCalendarEvent[]}>) => {
  const value = useMemo(
    () => getCalendarEventsByDate(calendar || []),
    [calendar],
  )

  return <EventsByDateContext value={value}>{children}</EventsByDateContext>
}
