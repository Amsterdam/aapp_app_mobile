import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NRGStatus, SessionStatus} from '@/modules/boat-charging/types'

export const getActiveSessions = (sessions?: BoatChargingSession[]) =>
  sessions?.filter(
    session =>
      session.status !== SessionStatus.COMPLETED &&
      [
        NRGStatus.CheckedOut,
        NRGStatus.Charging,
        NRGStatus.Starting,
        NRGStatus.Stopping,
      ].includes(session.nrg_status),
  )
