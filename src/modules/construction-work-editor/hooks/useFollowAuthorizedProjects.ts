import {useCallback} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {ConstructionWorkEditorResponseProject} from '@/modules/construction-work-editor/types'
import {useProjectFollowMutation} from '@/modules/construction-work/service'

export const useFollowAuthorizedProjects = () => {
  const [followProject] = useProjectFollowMutation()
  const {registerDeviceIfPermitted} = useRegisterDevice()

  const follow = useCallback(
    (
      authorizedProjects: Pick<ConstructionWorkEditorResponseProject, 'id'>[],
    ) => {
      if (authorizedProjects.length < 20) {
        authorizedProjects.forEach(async ({id}) => {
          await followProject({id: Number(id)})
        })
        void registerDeviceIfPermitted(true)
      }
    },
    [followProject, registerDeviceIfPermitted],
  )

  return {follow}
}
