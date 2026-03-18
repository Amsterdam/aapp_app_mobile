import {createContext} from 'react'
import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

export const CalendarContext = createContext<WasteGuideCalendarEvent[] | null>(
  null,
)
