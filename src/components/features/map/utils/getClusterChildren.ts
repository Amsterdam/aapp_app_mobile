import type {
  ClusterProperties,
  ClusterItem,
} from '@/components/features/map/types'

export const getClusterChildren = (
  cluster: ClusterProperties,
  getChildren: (id: number) => ClusterItem[],
): ClusterItem[] => {
  const clusterChildren = getChildren(cluster.cluster_id)

  return clusterChildren.reduce((acc, child) => {
    if ('cluster_id' in child.properties) {
      return [...acc, ...getClusterChildren(child.properties, getChildren)]
    }

    return [...acc, child]
  }, [] as ClusterItem[])
}
