import {createContext, useContext} from 'react'
import type {BoatChargingSession} from '@/modules/boat-charging/types'

export const BoatChargingSessionsContext = createContext<{
  activeSessions?: BoatChargingSession[]
  isError: boolean
  isLoading: boolean
} | null>(null)

export const useBoatChargingSessions = () => {
  const context = useContext(BoatChargingSessionsContext)

  if (!context)
    throw new Error(
      'useBoatChargingSessions must be used within BoatChargingSessionsProvider',
    )

  return context
}
