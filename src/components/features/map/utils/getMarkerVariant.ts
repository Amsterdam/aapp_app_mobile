import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'

/**
 *
 * @param selectedMarkerId The id of the currently selected marker.
 * @param distinctMarkerIds An array of distinct marker id's or single marker id
 * @returns Function that accepts the markerId in order to determine which MarkerVariant to return.
 */
export const getMarkerVariant =
  (
    selectedMarkerId?: string | number,
    distinctMarkerIds?: Array<string | number> | string | number,
  ) =>
  /**
   * Pass the id of the marker to check which variant to return.
   * @param markerId The string id of the marker to check against selected marker and other states.
   * @param customMarker A custom marker to render instead of the default pin.
   * @returns The correct MarkerVariant.
   */
  (markerId: string | number, customMarker?: MapMarkerVariant) => {
    if (markerId === selectedMarkerId) {
      return MapMarkerVariant.selectedPin
    }

    if (
      (Array.isArray(distinctMarkerIds) &&
        distinctMarkerIds?.includes(markerId)) ||
      distinctMarkerIds === markerId
    ) {
      return MapMarkerVariant.distinctPin
    }

    return customMarker || MapMarkerVariant.pin
  }
