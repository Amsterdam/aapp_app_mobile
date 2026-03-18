import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import type {PropsWithChildren} from 'react'
import {CalendarContext} from '@/modules/waste-guide/providers/CalendarContext'

export const CalendarProvider = ({
  children,
  calendar,
}: PropsWithChildren<{calendar: WasteGuideCalendarEvent[]}>) => (
  <CalendarContext.Provider value={calendar}>
    {children}
  </CalendarContext.Provider>
)
