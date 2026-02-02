import {useGetWasteGuideRecyclePointsQuery} from '@/modules/waste-guide/service'
import {useActiveRecyclePointId} from '@/modules/waste-guide/slice'

export const useGetActiveRecyclePoint = () => {
  const {data: recyclePoints, isLoading} = useGetWasteGuideRecyclePointsQuery()
  const {activeRecyclePointId} = useActiveRecyclePointId()

  const activeRecyclePoint =
    recyclePoints?.find(rp => rp.id === activeRecyclePointId) ??
    recyclePoints?.[0]

  return {activeRecyclePoint, isLoading}
}
