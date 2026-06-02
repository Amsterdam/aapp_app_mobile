import {use, useEffect} from 'react'
import {ScreenContext} from '@/providers/screen.context'

export const useScreenScrollDisable = (hasError: boolean) => {
  const screenContext = use(ScreenContext)

  useEffect(() => {
    screenContext.setScrollDisabled(hasError)
  }, [hasError, screenContext])
}

export const useIsScreenScrollDisabled = () => use(ScreenContext).scrollDisabled
