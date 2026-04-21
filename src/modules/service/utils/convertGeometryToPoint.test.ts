import type {Feature} from 'geojson'
import {convertGeometryToPoint} from '@/modules/service/utils/convertGeometryToPoint'

const features: Record<string, Feature> = {
  point: {
    type: 'Feature',
    id: 'point',
    geometry: {
      type: 'Point',
      coordinates: [4.88471, 52.370307, 999],
    },
    properties: {},
  },
  lineString: {
    type: 'Feature',
    id: 'lineString',
    geometry: {
      type: 'LineString',
      coordinates: [
        [4.1, 52.1],
        [4.2, 52.2],
      ],
    },
    properties: {},
  },
  polygon: {
    type: 'Feature',
    id: 'polygon',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [4.1, 52.1],
          [4.2, 52.2],
        ],
      ],
    },
    properties: {},
  },
  multiPolygon: {
    type: 'Feature',
    id: 'multiPolygon',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [4.1, 52.1],
            [4.2, 52.2],
          ],
        ],
      ],
    },
    properties: {},
  },
  empty: {
    type: 'Feature',
    id: 'empty',
    geometry: {
      type: 'GeometryCollection',
      geometries: [],
    },
    properties: {},
  },
}

describe('convertGeometryToPoint', () => {
  it('converts Point geometry to Point (keeps first two numbers)', () => {
    const result = convertGeometryToPoint([features.point])

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('point')
    expect(result[0].geometry.type).toBe('Point')
    expect(result[0].geometry.coordinates).toEqual([4.88471, 52.370307])
  })

  it('converts LineString geometry to a Point at its first position', () => {
    const result = convertGeometryToPoint([features.lineString])

    expect(result).toHaveLength(1)
    expect(result[0].geometry).toEqual({
      type: 'Point',
      coordinates: [4.1, 52.1],
    })
  })

  it('converts Polygon geometry to a Point at its first ring first position', () => {
    const result = convertGeometryToPoint([features.polygon])

    expect(result).toHaveLength(1)
    expect(result[0].geometry.coordinates).toEqual([4.1, 52.1])
  })

  it('converts MultiPolygon geometry to a Point at its first polygon first ring first position', () => {
    const result = convertGeometryToPoint([features.multiPolygon])

    expect(result).toHaveLength(1)
    expect(result[0].geometry.coordinates).toEqual([4.1, 52.1])
  })

  it('ignores GeometryCollection features (no coordinates field)', () => {
    const result = convertGeometryToPoint([features.empty])

    expect(result).toEqual([])
  })

  it('returns only Points', () => {
    const result = convertGeometryToPoint(Object.values(features))

    expect(Array.from(new Set(result.map(r => r.geometry.type)))).toEqual([
      'Point',
    ])
  })
})
