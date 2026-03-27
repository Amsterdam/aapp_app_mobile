import {createContext} from 'react'
import type {BottomSheetState} from '@/components/features/bottom-sheet/providers/bottomSheet.provider'

type BottomSheetContextValue = BottomSheetState & {
  close: () => void
  open: (newVariant?: string) => void
  toggle: (newVariant?: string) => void
}

const defaultValue: BottomSheetContextValue = {
  isOpen: false,
  variant: undefined,
  close: () => null,
  open: () => null,
  toggle: () => null,
}

export const BottomSheetContext =
  createContext<BottomSheetContextValue>(defaultValue)
