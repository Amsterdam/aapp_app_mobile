import {createContext, type Dispatch, type SetStateAction} from 'react'
import type {ScreenProps} from '@/components/features/screen/Screen'

export type ScreenContextType = {
  nativeScreenHeader: boolean
  overrideProps: Dispatch<SetStateAction<Partial<ScreenProps>>>
  restoreOriginalProps: () => void
  scrollDisabled: boolean
  setScrollDisabled: Dispatch<SetStateAction<boolean>>
}

export const ScreenContext = createContext<ScreenContextType>({
  nativeScreenHeader: false,
  scrollDisabled: false,
  setScrollDisabled: () => null,
  overrideProps: () => null,
  restoreOriginalProps: () => null,
})
