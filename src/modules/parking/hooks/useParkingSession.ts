import {createContext, type RefObject, useContext} from 'react'
import type {Dayjs} from '@/utils/datetime/dayjs'

export const ParkingSessionContext = createContext<{
  startTimeRef: RefObject<Dayjs | null>
  userHasEditedStart: RefObject<boolean>
} | null>(null)

export const useParkingSession = () => {
  const context = useContext(ParkingSessionContext)

  if (!context)
    throw new Error('useParkingSession must be used within ParkingFormProvider')

  return context
}
