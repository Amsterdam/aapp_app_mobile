import {type ContextType, type ReactNode, useMemo} from 'react'
import {BottomSheetContext} from '../../../src/components/features/bottom-sheet/providers/bottomSheet.context'

export type BottomSheetStorybookParameters = Partial<
  ContextType<typeof BottomSheetContext>
>

const defaultBottomSheetValue: ContextType<typeof BottomSheetContext> = {
  close: () => null,
  isOpen: true,
  open: () => null,
  toggle: () => null,
  variant: undefined,
}

type Props = {
  children: ReactNode
  parameters?: BottomSheetStorybookParameters
}

export const BottomSheetStorybookProvider = ({children, parameters}: Props) => {
  const bottomSheetValue = useMemo(
    () => ({
      ...defaultBottomSheetValue,
      ...parameters,
    }),
    [parameters],
  )

  return (
    <BottomSheetContext.Provider value={bottomSheetValue}>
      {children}
    </BottomSheetContext.Provider>
  )
}
