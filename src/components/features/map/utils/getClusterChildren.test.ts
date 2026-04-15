import type {
  ClusterItem,
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import {getClusterChildren} from '@/components/features/map/utils/getClusterChildren'

const createMarkerItem = (id: string): ClusterItem => ({
  geometry: {coordinates: [0, 0]},
  properties: {id} as MarkerProperties,
})

const createClusterItem = (cluster_id: number): ClusterItem => ({
  geometry: {coordinates: [0, 0]},
  properties: {cluster_id} as ClusterProperties,
})

const getMarkerIds = (item: ClusterItem) =>
  (item.properties as MarkerProperties).id

describe('getClusterChildren', () => {
  it('returns direct leaf markers when no nested cluster is among its children', () => {
    const getChildren = jest.fn((id: number) => {
      if (id === 1) return [createMarkerItem('a'), createMarkerItem('b')]

      return []
    })

    const clusterProps = {cluster_id: 1} as ClusterProperties

    const result = getClusterChildren(clusterProps, getChildren)

    expect(result.map(getMarkerIds)).toEqual(['a', 'b'])

    expect(getChildren).toHaveBeenCalledTimes(1)
    expect(getChildren).toHaveBeenCalledWith(1)
  })

  it('flattens nested clusters', () => {
    const getChildren = jest.fn(
      (id: number) =>
        ({
          1: [createClusterItem(2), createMarkerItem('a')],
          2: [createMarkerItem('b'), createClusterItem(3)],
          3: [createMarkerItem('c')],
        })[id] ?? [],
    )

    const result1 = getClusterChildren(
      {cluster_id: 1} as ClusterProperties,
      getChildren,
    )
    const result2 = getClusterChildren(
      {cluster_id: 2} as ClusterProperties,
      getChildren,
    )
    const result3 = getClusterChildren(
      {cluster_id: 3} as ClusterProperties,
      getChildren,
    )
    const result4 = getClusterChildren(
      {cluster_id: 4} as ClusterProperties,
      getChildren,
    )

    expect(result1.map(getMarkerIds)).toEqual(['b', 'c', 'a'])
    expect(result2.map(getMarkerIds)).toEqual(['b', 'c'])
    expect(result3.map(getMarkerIds)).toEqual(['c'])
    expect(result4.map(getMarkerIds)).toEqual([])

    expect(getChildren.mock.calls.map(([id]) => id)).toEqual([
      1, 2, 3, 2, 3, 3, 4,
    ])
  })
})
