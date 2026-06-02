import {type ReactNode, useMemo, useState} from 'react'
import {ScreenContext} from '@/providers/screen.context'

type Props = {
  children: ReactNode
  nativeScreenHeader?: boolean
}

export const ScreenProvider = ({
  children,
  nativeScreenHeader = true,
}: Props) => {
  const [scrollDisabled, setScrollDisabled] = useState<boolean>(false)

  const value = useMemo(
    () => ({scrollDisabled, setScrollDisabled, nativeScreenHeader}),
    [scrollDisabled, setScrollDisabled, nativeScreenHeader],
  )

  return <ScreenContext value={value}>{children}</ScreenContext>
}
