import {useContext} from 'react'
import {EventsByDateContext} from '@/modules/waste-guide/providers/EventsByDateContext'

export const useEventsByDate = () => {
  const context = useContext(EventsByDateContext)

  if (!context) {
    throw new Error(
      'useEventsByDate must be used within a EventsByDateProvider',
    )
  }

  return context
}
