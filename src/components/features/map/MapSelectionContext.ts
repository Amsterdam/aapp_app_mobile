import {
  useCallback,
  useEffect,
  useEffectEvent,
  useSyncExternalStore,
} from 'react'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Listener = () => void
type MarkerID = string | number | undefined

const currentSelectedIdMap = new Map<ModuleSlug, MarkerID>()

const listeners = new Set<Listener>()

const subscribe = (listener: Listener) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = (moduleSlug: ModuleSlug) =>
  currentSelectedIdMap.get(moduleSlug)

const setMapSelection = (moduleSlug: ModuleSlug, id: MarkerID) => {
  const currentSelectedId = currentSelectedIdMap.get(moduleSlug)

  if (currentSelectedId === id) {
    return
  }

  if (id === undefined) {
    currentSelectedIdMap.delete(moduleSlug)
  } else {
    currentSelectedIdMap.set(moduleSlug, id)
  }

  listeners.forEach(l => l())
}

/**
 * Only re-renders when the boolean result changes for this specific marker,
 * so selecting a marker only re-renders 2 ClusterSwitch instances (old + new)
 * instead of all visible markers.
 */
export const useIsMarkerSelected = (
  /**
   * Each map instance that relies on this hook keeps track of its own current selected ID. Instances are differentiated using ModuleSlug.
   */
  moduleSlug: ModuleSlug,
  /**
   * The id that needs to be marked as selected.
   */
  markerId: MarkerID,
): boolean =>
  useSyncExternalStore(
    subscribe,

    useCallback(
      () => markerId != null && getSnapshot(moduleSlug) === markerId,
      [markerId, moduleSlug],
    ),
  )

export const useSetMapSelection = (
  /**
   * Each map instance that relies on this hook keeps track of its own current selected ID. Instances are differentiated using ModuleSlug.
   */
  moduleSlug: ModuleSlug,
  /**
   * The id that needs to be marked as selected.
   */
  id: MarkerID,
  /**
   * Called after synchronizing the selection on mount and when the ID or module
   * changes, including an explicit undefined ID. Unmount cleanup is not a
   * selection event, and changing the callback alone does not trigger it.
   */
  onMapSelection?: (id?: MarkerID) => void,
) => {
  const notifyMapSelection = useEffectEvent((selectedId: MarkerID) => {
    onMapSelection?.(selectedId)
  })

  useEffect(() => {
    setMapSelection(moduleSlug, id)
    notifyMapSelection(id)
  }, [id, moduleSlug])

  useEffect(() => () => setMapSelection(moduleSlug, undefined), [moduleSlug])
}
