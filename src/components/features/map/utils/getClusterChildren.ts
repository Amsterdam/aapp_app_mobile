import type {
  ClusterProperties,
  ClusterItem,
} from '@/components/features/map/types'

export const getClusterChildren = (
  cluster: ClusterProperties,
  getChildren: (id: number) => ClusterItem[],
): ClusterItem[] => {
  const flattenedChildren: ClusterItem[] = []

  const initialChildren = getChildren(cluster.cluster_id)

  let clusterChildren: ClusterItem[] = initialChildren

  while (clusterChildren.length) {
    clusterChildren = clusterChildren
      .flatMap(child => {
        if ('cluster_id' in child.properties) {
          return getChildren(child.properties.cluster_id)
        }

        flattenedChildren.push(child)

        return null
      })
      .filter((c): c is ClusterItem => Boolean(c))
  }

  return flattenedChildren
}
