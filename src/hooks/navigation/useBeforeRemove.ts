import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'

/**
 * Executes the callback when the screen is about to be removed, i.e. when you navigate back.
 */
export const useBeforeRemove = (callback: () => void) => {
  const navigation = useNavigation()

  useEffect(
    () => navigation.addListener('beforeRemove', callback),
    [callback, navigation],
  )
}
