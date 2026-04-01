import {createContext, useContext} from 'react'
export const BottomSheetPresenceContext = createContext(false)
export const useIsInBottomSheet = () => useContext(BottomSheetPresenceContext)
