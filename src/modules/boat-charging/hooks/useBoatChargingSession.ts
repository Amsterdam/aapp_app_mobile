import {createContext, useContext} from 'react'
import type {
  BoatChargingSession,
  BoatChargingSettings,
  SessionLengthStatus,
} from '@/modules/boat-charging/types'
import type {Dayjs} from '@/utils/datetime/dayjs'

export const BoatChargingSessionContext = createContext<{
  chargingTimeString?: string
  isError: boolean
  isLoading: boolean
  isNotPluggedInErrorVisible: boolean
  isPluggedIn: boolean
  lastUpdated?: Dayjs
  onPressStartButtonNotPluggedIn: () => void
  session?: BoatChargingSession
  sessionLengthStatus: SessionLengthStatus
  settings?: BoatChargingSettings
} | null>(null)

export const useBoatChargingSession = () => {
  const context = useContext(BoatChargingSessionContext)

  if (!context)
    throw new Error(
      'useBoatChargingSession must be used within BoatChargingSessionProvider',
    )

  return context
}
