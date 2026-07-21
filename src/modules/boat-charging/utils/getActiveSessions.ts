import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NRGStatus, SessionStatus} from '@/modules/boat-charging/types'

export const getActiveSessions = (sessions?: BoatChargingSession[]) =>
  sessions?.filter(
    session =>
      session.status !== SessionStatus.COMPLETED &&
      (session.nrg_status === NRGStatus.CheckedOut ||
        session.nrg_status === NRGStatus.Charging),
  )
