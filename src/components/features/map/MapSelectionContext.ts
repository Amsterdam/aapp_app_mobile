import {
  useCallback,
  useEffect,
  useEffectEvent,
  useSyncExternalStore,
} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Listener = () => void
type MarkerID = string | number | undefined

export type MapIdentifier = ModuleSlug | `${ModuleSlug}${'.'}${string | number}`

const currentSelectedIdMap = new Map<string, MarkerID>()

const listenerMap = new Map<string, Set<Listener>>()

const subscribe = (listener: Listener, mapIdentifier: MapIdentifier) => {
  let listeners = listenerMap.get(mapIdentifier)

  if (!listeners) {
    listeners = new Set<Listener>()
    listenerMap.set(mapIdentifier, listeners)
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      listenerMap.delete(mapIdentifier)
    }
  }
}

const getSnapshot = (mapIdentifier: MapIdentifier) =>
  currentSelectedIdMap.get(mapIdentifier)

const setMapSelection = (mapIdentifier: MapIdentifier, id: MarkerID) => {
  const currentSelectedId = currentSelectedIdMap.get(mapIdentifier)

  if (currentSelectedId === id) {
    return
  }

  if (id === undefined) {
    currentSelectedIdMap.delete(mapIdentifier)
  } else {
    currentSelectedIdMap.set(mapIdentifier, id)
  }

  listenerMap.get(mapIdentifier)?.forEach(listener => listener())
}

/**
 * Only re-renders when the boolean result changes for this specific marker,
 * so selecting a marker only re-renders 2 ClusterSwitch instances (old + new)
 * instead of all visible markers.
 */
export const useIsMarkerSelected = (
  /**
   * Each map instance that relies on this hook keeps track of its own current selected ID. Instances are differentiated using ModuleSlug and additional specifier.
   */
  mapIdentifier: MapIdentifier,
  /**
   * The id that needs to be marked as selected.
   */
  markerId: MarkerID,
): boolean =>
  useSyncExternalStore(
    useCallback(
      listener => subscribe(listener, mapIdentifier),
      [mapIdentifier],
    ),
    useCallback(
      () => markerId != null && getSnapshot(mapIdentifier) === markerId,
      [markerId, mapIdentifier],
    ),
  )

export const useSetMapSelection = (
  /**
   * Each map instance that relies on this hook keeps track of its own current selected ID. Instances are differentiated using ModuleSlug and additional specifier.
   */
  mapIdentifier: MapIdentifier,
  /**
   * The id that needs to be marked as selected.
   */
  id: MarkerID,
  /**
   * Called after synchronizing the selection on mount and when the ID or module
   * changes, including an explicit undefined ID. Unmount cleanup is not a
   * selection event, and changing the callback alone does not trigger it.
   *
   * If a string is passed, opens that bottom-sheet variant when an ID is selected.
   * Clearing the selection does not open or close the sheet. Changing the variant
   * alone does not open it; the latest variant is used for the next selection.
   */
  onMapSelection?: ((id?: MarkerID) => void) | string,
) => {
  const {open} = useBottomSheet()

  const notifyMapSelection = useEffectEvent((selectedId: MarkerID) => {
    if (typeof onMapSelection === 'string') {
      if (selectedId !== undefined) {
        open(onMapSelection)
      }

      return
    }

    onMapSelection?.(selectedId)
  })

  useEffect(() => {
    setMapSelection(mapIdentifier, id)
    notifyMapSelection(id)
  }, [id, mapIdentifier])

  useEffect(
    () => () => setMapSelection(mapIdentifier, undefined),
    [mapIdentifier],
  )
}
