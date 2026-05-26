import {createContext, type RefObject, useContext} from 'react'

export const ParkingSessionContext = createContext<{
  userHasEditedStart: RefObject<boolean>
} | null>(null)

export const useParkingSession = () => {
  const ctx = useContext(ParkingSessionContext)

  if (!ctx)
    throw new Error('useParkingSession must be used within ParkingFormProvider')

  return ctx
}
