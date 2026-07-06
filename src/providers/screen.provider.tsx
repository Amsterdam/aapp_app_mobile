import {type ReactNode, useMemo, useState} from 'react'
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

  const value = useMemo(
    () => ({
      scrollDisabled,
      setScrollDisabled,
      nativeScreenHeader,
      overrideProps,
    }),
    [scrollDisabled, setScrollDisabled, nativeScreenHeader, overrideProps],
  )

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  )
}
