import {useEffect, useState} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {config} from '@/modules/construction-work/components/projects/config'
import {useProjectsInfiniteQuery} from '@/modules/construction-work/service'

export const PreRenderComponent = () => {
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false)

  // Use the same params as the Projects component to already have the data in the cache
  const {data} = useProjectsInfiniteQuery(
    {
      page_size: config.projectItemListPageSize,
    },
    {skip: hasRequestedPermission, initialPageParam: 1},
  )

  // At app startup, ask permission for push notifications if the user is following a project
  useEffect(() => {
    if (data?.pages[0]?.result?.[0].followed && !hasRequestedPermission) {
      void registerDeviceIfPermitted(true)
      setHasRequestedPermission(true)
    }
  }, [data?.pages, hasRequestedPermission, registerDeviceIfPermitted])

  return null
}
