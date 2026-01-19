import {useState, useEffect} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'

export const usePendingScreen = <T>() => {
  const route = useRoute()
  const [pendingScreen, setPendingScreen] = useState<T | undefined>(undefined)

  useEffect(() => {
    const params = route.params as {screen?: typeof pendingScreen}

    if (params && typeof params.screen === 'string') {
      setPendingScreen(params.screen)
    }
  }, [route.params, pendingScreen])

  return {pendingScreen, setPendingScreen}
}
