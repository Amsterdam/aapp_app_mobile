import {createContext, useContext} from 'react'
import type {BoatChargingSession} from '@/modules/boat-charging/types'
import type {Dayjs} from '@/utils/datetime/dayjs'

export const BoatChargingSessionsContext = createContext<{
  activeSession?: BoatChargingSession
  activeSessions?: BoatChargingSession[]
  chargingTimeString?: string
  isError: boolean
  isLoading: boolean
  isNotPluggedInErrorVisible: boolean
  isPluggedIn: boolean
  lastUpdated?: Dayjs
  onPressStartButtonNotPluggedIn: () => void
  sessions?: BoatChargingSession[]
} | null>(null)

export const useBoatChargingSessions = () => {
  const context = useContext(BoatChargingSessionsContext)

  if (!context)
    throw new Error(
      'useBoatChargingSessions must be used within BoatChargingSessionsProvider',
    )

  return context
}
