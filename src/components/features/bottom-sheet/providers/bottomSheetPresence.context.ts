import {createContext, use} from 'react'
export const BottomSheetPresenceContext = createContext(false)
export const useIsInBottomSheet = () => use(BottomSheetPresenceContext)
