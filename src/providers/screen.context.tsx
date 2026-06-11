import {createContext, type Dispatch} from 'react'

export type ScreenContextType = {
  nativeScreenHeader: boolean
  scrollDisabled: boolean
  setScrollDisabled: Dispatch<React.SetStateAction<boolean>>
}

export const ScreenContext = createContext<ScreenContextType>({
  nativeScreenHeader: false,
  scrollDisabled: false,
  setScrollDisabled: () => null,
})
