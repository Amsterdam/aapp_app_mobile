import {useCallback, useEffect, useSyncExternalStore} from 'react'

type Listener = () => void
type MarkerID = string | number | undefined

let currentSelectedId: MarkerID
const listeners = new Set<Listener>()

const subscribe = (listener: Listener) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => currentSelectedId

export const setMapSelection = (id: MarkerID) => {
  if (currentSelectedId === id) {
    return
  }

  currentSelectedId = id
  listeners.forEach(l => l())
}

/**
 * Only re-renders when the boolean result changes for this specific marker,
 * so selecting a marker only re-renders 2 ClusterSwitch instances (old + new)
 * instead of all visible markers.
 */
export const useIsMarkerSelected = (markerId: MarkerID): boolean =>
  useSyncExternalStore(
    subscribe,

    useCallback(
      () => markerId != null && getSnapshot() === markerId,
      [markerId],
    ),
  )

export const useSetMapSelection = (id: MarkerID) => {
  useEffect(() => {
    setMapSelection(id)

    return () => setMapSelection(undefined)
  }, [id])
}
