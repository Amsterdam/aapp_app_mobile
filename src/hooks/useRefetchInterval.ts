import {useEffect, useLayoutEffect, useRef} from 'react'

/**
 *
 * @param refetch function that should be called to refetch data
 * @param interval time in milliseconds between refetches, set to 0 to disable
 */
export const useRefetchInterval = (refetch: () => void, interval: number) => {
  const refetchRef = useRef(refetch)

  // Keep the ref current without triggering the interval effect
  useLayoutEffect(() => {
    refetchRef.current = refetch
  })

  useEffect(() => {
    if (interval > 0) {
      const intervalId = setInterval(() => refetchRef.current(), interval)

      return () => clearInterval(intervalId)
    }
  }, [interval])
}
