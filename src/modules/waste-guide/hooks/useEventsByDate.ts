import {use} from 'react'
import {EventsByDateContext} from '@/modules/waste-guide/providers/EventsByDateContext'

export const useEventsByDate = () => {
  const context = use(EventsByDateContext)

  if (!context) {
    throw new Error(
      'useEventsByDate must be used within a EventsByDateProvider',
    )
  }

  return context
}
