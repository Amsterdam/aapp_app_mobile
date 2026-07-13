import {useCallback, useMemo, useState, type ReactNode} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {useMenu} from '@/store/slices/menu'

export type BottomSheetState = {
  isOpen: boolean
  params?: Record<string, unknown>
  variant?: string
}

export const BottomSheetProvider = ({children}: {children: ReactNode}) => {
  const {close: closeMenu} = useMenu()
  const [state, setState] = useState<BottomSheetState>({
    isOpen: false,
  })

  const close = useCallback(() => {
    setState({
      isOpen: false,
      variant: undefined,
      params: undefined,
    })
  }, [])

  const open = useCallback(
    (newVariant?: string, params?: Record<string, unknown>) => {
      closeMenu()
      setState({
        isOpen: true,
        variant: newVariant,
        params,
      })
    },
    [closeMenu],
  )

  const toggle = useCallback(
    (newVariant?: string, params?: Record<string, unknown>) => {
      closeMenu()
      setState(previousState => ({
        isOpen: !previousState.isOpen,
        variant: newVariant,
        params: previousState.isOpen ? undefined : params,
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

  return <BottomSheetContext value={value}>{children}</BottomSheetContext>
}
