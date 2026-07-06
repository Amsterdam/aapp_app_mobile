import {createContext, type Dispatch} from 'react'
import type {ScreenProps} from '@/components/features/screen/Screen'

export type ScreenContextType = {
  nativeScreenHeader: boolean
  overrideProps: Dispatch<React.SetStateAction<Partial<ScreenProps>>>
  scrollDisabled: boolean
  setScrollDisabled: Dispatch<React.SetStateAction<boolean>>
}

export const ScreenContext = createContext<ScreenContextType>({
  nativeScreenHeader: false,
  scrollDisabled: false,
  setScrollDisabled: () => null,
  overrideProps: () => null,
})
