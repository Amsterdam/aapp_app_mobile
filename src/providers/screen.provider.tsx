import {type ReactNode, useCallback, useMemo, useState} from 'react'
import {ScreenContext, type ScreenContextType} from '@/providers/screen.context'

type Props = {
  children: ReactNode
  nativeScreenHeader?: boolean
  overrideProps: ScreenContextType['overrideProps']
}

export const ScreenProvider = ({
  children,
  nativeScreenHeader = true,
  overrideProps,
}: Props) => {
  const [scrollDisabled, setScrollDisabled] = useState<boolean>(false)

  const restoreOriginalProps = useCallback(
    () => overrideProps({}),
    [overrideProps],
  )

  const value = useMemo(
    () => ({
      scrollDisabled,
      setScrollDisabled,
      nativeScreenHeader,
      overrideProps,
      restoreOriginalProps,
    }),
    [
      scrollDisabled,
      setScrollDisabled,
      nativeScreenHeader,
      overrideProps,
      restoreOriginalProps,
    ],
  )

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  )
}
