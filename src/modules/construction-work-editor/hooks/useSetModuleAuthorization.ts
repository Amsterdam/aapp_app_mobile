import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {
  removeAuthorizedModule,
  addAuthorizedModule,
} from '@/store/slices/modules'
import {isApiAuthorizationError} from '@/utils/api'

export const useSetModuleAuthorization = () => {
  const dispatch = useDispatch()
  const setModuleAuthorization = useCallback(
    (
      isGetProjectManagerSuccess: boolean,
      getProjectManagerError: FetchBaseQueryError | SerializedError | undefined,
    ) => {
      if (
        getProjectManagerError &&
        isApiAuthorizationError(getProjectManagerError)
      ) {
        dispatch(removeAuthorizedModule(ModuleSlug['construction-work-editor']))

        return
      }

      if (isGetProjectManagerSuccess) {
        dispatch(addAuthorizedModule(ModuleSlug['construction-work-editor']))
      }
    },
    [dispatch],
  )

  return {setModuleAuthorization}
}
