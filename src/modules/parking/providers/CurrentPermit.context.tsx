import {createContext} from 'react'
import {ParkingPermit} from '@/modules/parking/types'

export const CurrentPermitContext = createContext<
  | (ParkingPermit & {
      /**
       * True when the permit is not yet active (its `started_at` date is after today/tomorrow).
       * Only relevant for permits with `max_session_length_in_days === 1` (can plan a session max one day ahead).
       */
      isPermitStartedAtInFuture: boolean
    })
  | null
>(null)
