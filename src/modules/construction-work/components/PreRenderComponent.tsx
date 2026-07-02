import {useEffect, useState} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {config} from '@/modules/construction-work/components/projects/config'
import {useProjectsQuery} from '@/modules/construction-work/service'

export const PreRenderComponent = () => {
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false)

  // Use the same params as the Projects component to already have the data in the cache
  const {data} = useProjectsQuery(
    {
      page_size: config.projectItemListPageSize,
      page: 1,
    },
    {skip: hasRequestedPermission},
  )

  // At app startup, ask permission for push notifications if the user is following a project
  useEffect(() => {
    if (data?.result?.[0].followed && !hasRequestedPermission) {
      void registerDeviceIfPermitted(true)
      setHasRequestedPermission(true)
    }
  }, [data?.result, hasRequestedPermission, registerDeviceIfPermitted])

  return null
}
