import {createContext} from 'react'
import type {Region} from 'react-native-maps'
import {ParkingMachine} from '@/modules/parking/types'

type ParkingMapContext = {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  region?: Region
  resetSelectedParkingMachineId: () => void
  selectedParkingMachineId?: ParkingMachine['id']
  setRegion: (region: Region) => void
}

export const PermitMapContext = createContext<ParkingMapContext | null>(null)
