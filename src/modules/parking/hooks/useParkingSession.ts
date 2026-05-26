import {createContext, type RefObject, useContext} from 'react'

export const ParkingSessionContext = createContext<{
  userHasEditedStart: RefObject<boolean>
} | null>(null)

export const useParkingSession = () => {
  const context = useContext(ParkingSessionContext)

  if (!context)
    throw new Error('useParkingSession must be used within ParkingFormProvider')

  return context
}
