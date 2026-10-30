import type {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {createContext} from 'react'

export type PiwikContextType = PiwikProSdkType | null | undefined

/**
 * The PiwikContext contains the object with all methods, to be used via the usePiwik hook only.
 */
export const PiwikContext = createContext<PiwikContextType>(undefined)
