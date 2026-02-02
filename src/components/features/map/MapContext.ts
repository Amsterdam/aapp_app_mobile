import {createContext, type RefObject} from 'react'
import type {Region} from 'react-native-maps'
import type MapView from 'react-native-maps'

type MapContextReturnValue = {
  getCurrentRegion: () => Region | null
  map: RefObject<MapView | null>
}

export const MapContext = createContext<MapContextReturnValue | null>(null)
