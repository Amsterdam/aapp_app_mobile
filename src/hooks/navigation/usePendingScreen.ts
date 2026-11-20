import {useMemo} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'

export const usePendingScreen = <T>() => {
  const route = useRoute()

  return useMemo(
    () => (route.params as {screen?: T} | undefined)?.screen,
    [route],
  )
}
