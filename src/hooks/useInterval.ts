import {useEffect, useLayoutEffect, useRef} from 'react'

export const useInterval = (callback: () => void, interval: number) => {
  const callbackRef = useRef(callback)

  // Keep the ref current without triggering the interval effect
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (interval > 0) {
      const intervalId = setInterval(() => callbackRef.current(), interval)

      return () => clearInterval(intervalId)
    }
  }, [interval])
}
