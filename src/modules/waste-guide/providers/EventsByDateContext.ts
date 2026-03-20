import {createContext} from 'react'
import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

export const EventsByDateContext = createContext<Record<
  string,
  WasteGuideCalendarEvent[]
> | null>(null)
