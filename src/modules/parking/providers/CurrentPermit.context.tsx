import {createContext} from 'react'
import {ParkingPermit} from '@/modules/parking/types'

export const CurrentPermitContext = createContext<
  | (ParkingPermit & {
      /**
       * True when the permit is not yet active (its `started_at` date is after today/tomorrow).
       */
      isNotYetActive: boolean
    })
  | null
>(null)
