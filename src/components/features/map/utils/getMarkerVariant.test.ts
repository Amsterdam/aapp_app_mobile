import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'

const SELECTED_MARKER = '1234'
const DISTINCT_MARKERS = [1, '2', 'test_id']

const markerVariant = getMarkerVariant(SELECTED_MARKER, DISTINCT_MARKERS)

describe('getMarkerVariant', () => {
  it('should return a regular pin if neither selected nor favorite.', () => {
    expect(markerVariant('random_id')).toBe(MapMarkerVariant.pin)
  })

  it('should return a selectedPin if marker is selected.', () => {
    expect(markerVariant('1234')).toBe(MapMarkerVariant.selectedPin)
  })

  it('should return a distinctPin if marker is not selected, but included in distinctMarkerIds.', () => {
    expect(markerVariant('test_id')).toBe(MapMarkerVariant.distinctPin)
  })

  it('should return a selectedPin if marker is selected, regardless of distinctMarkerIds.', () => {
    const variant = getMarkerVariant('1', '1')

    expect(variant('1')).toBe(MapMarkerVariant.selectedPin)
  })

  describe('customMarker', () => {
    it('should return a customMarker if marker is neither selected nor distinct, and a customMarker is provided.', () => {
      expect(markerVariant('1', MapMarkerVariant.electionsCrowdBusyPin)).toBe(
        MapMarkerVariant.electionsCrowdBusyPin,
      )

      expect(markerVariant('1', MapMarkerVariant.selectedPin)).toBe(
        MapMarkerVariant.selectedPin, // Here, the selectedPin is set as the customMarker
      )
    })

    it('should overrule customMarker with selectedPin if marker is selected', () => {
      expect(
        markerVariant('1234', MapMarkerVariant.electionsCrowdMediumPin),
      ).toBe(MapMarkerVariant.selectedPin)
    })

    it('should overrule customMarker with distinctPin if marker is distinct', () => {
      expect(
        markerVariant('test_id', MapMarkerVariant.electionsCrowdUnknownPin),
      ).toBe(MapMarkerVariant.distinctPin)
    })
  })
})
