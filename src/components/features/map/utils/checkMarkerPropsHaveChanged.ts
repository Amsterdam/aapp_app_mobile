import type {MarkerProps} from '@/components/features/map/marker/Marker'

/**
 *
 * @param previousMarkerProps
 * @param nextMarkerProps
 * @returns ```true``` if unchanged, ```false``` if changed
 */
export const checkMarkerPropsHaveChanged = (
  prevMarker: MarkerProps,
  nextMarker: MarkerProps,
) =>
  prevMarker.id === nextMarker.id &&
  prevMarker.coordinate.latitude === nextMarker.coordinate.latitude &&
  prevMarker.coordinate.longitude === nextMarker.coordinate.longitude &&
  prevMarker.children === nextMarker.children
