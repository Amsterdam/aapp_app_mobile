import {createContext} from 'react'
import type {Region} from 'react-native-maps'
import {
  ParkingMachine,
  type ParkingPermitMapViewType,
} from '@/modules/parking/types'

type ParkingMapContext = {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  region?: Region
  resetSelectedParkingMachineId: () => void
  selectedParkingMachineId?: ParkingMachine['id']
  setRegion: (region: Region) => void
  toggleViewType: () => void
  viewType: ParkingPermitMapViewType
  viewVariants: ['map', Exclude<ParkingPermitMapViewType, 'map'>]
}

export const PermitMapContext = createContext<ParkingMapContext | null>(null)
