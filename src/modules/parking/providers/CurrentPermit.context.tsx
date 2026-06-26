import {createContext} from 'react'
import {ParkingPermit} from '@/modules/parking/types'

export const CurrentPermitContext = createContext<
  | (ParkingPermit & {
      /**
       * Determines wether permit has started and can be used to start sessions today or tomorrow.
       */
      isNotYetActive: boolean
    })
  | null
>(null)
