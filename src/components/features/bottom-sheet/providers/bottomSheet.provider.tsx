import {useCallback, useMemo, useState, type ReactNode} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {useMenu} from '@/store/slices/menu'

export type BottomSheetState = {
  isOpen: boolean
  variant?: string
}

export const BottomSheetProvider = ({children}: {children: ReactNode}) => {
  const {close: closeMenu} = useMenu()
  const [state, setState] = useState<BottomSheetState>({
    isOpen: false,
    variant: undefined,
  })

  const close = useCallback(() => {
    setState({
      isOpen: false,
      variant: undefined,
    })
  }, [])

  const open = useCallback(
    (newVariant?: string) => {
      closeMenu()
      setState({
        isOpen: true,
        variant: newVariant,
      })
    },
    [closeMenu],
  )

  const toggle = useCallback(
    (newVariant?: string) => {
      closeMenu()
      setState(previousState => ({
        isOpen: !previousState.isOpen,
        variant: newVariant,
      }))
    },
    [closeMenu],
  )

  const value = useMemo(
    () => ({
      ...state,
      close,
      open,
      toggle,
    }),
    [close, open, state, toggle],
  )

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  )
}
