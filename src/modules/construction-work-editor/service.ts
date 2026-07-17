import {
  removeConstructionWorkEditorToken,
  selectConstructionWorkEditorAccessToken,
} from '@/modules/construction-work-editor/slice'
import {
  AddProjectWarningImageQueryArgs,
  AddProjectWarningImageResponse,
  AddProjectWarningQueryArgs,
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
  ProjectWarningResponse,
} from '@/modules/construction-work-editor/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn, PrepareHeaders} from '@/services/types'
import {type RootState} from '@/store/types/rootState'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const MODULE_SLUG = ModuleSlug['construction-work']

const prepareHeaders: PrepareHeaders = (headers, {getState}) => {
  const token = selectConstructionWorkEditorAccessToken(getState() as RootState)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

/**
 * Removes a token that causes the backend to return a 403 forbidden error
 */
const afterError: AfterBaseQueryErrorFn = ({error}, {dispatch}) => {
  if (error?.status === 403) {
    dispatch(removeConstructionWorkEditorToken())
  }
}

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEditorEndpointName.getProjects]: builder.query<
      ConstructionWorkEditorResponse,
      void
    >({
      query: () => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/manage/projects', params: {}}),
        prepareHeaders,
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.second,
    }),
    [ConstructionWorkEditorEndpointName.addProjectWarning]: builder.mutation<
      ProjectWarningResponse,
      AddProjectWarningQueryArgs
    >({
      invalidatesTags: ['Articles', 'Projects'],
      query: ({projectId, ...body}) => ({
        body,
        method: 'POST',
        slug: MODULE_SLUG,
        url: `/manage/projects/${projectId}/warnings`,
        prepareHeaders,
        afterError,
      }),
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),
    [ConstructionWorkEditorEndpointName.addProjectWarningImage]:
      builder.mutation<
        AddProjectWarningImageResponse,
        AddProjectWarningImageQueryArgs
      >({
        query: formData => ({
          body: formData,
          method: 'POST',
          slug: MODULE_SLUG,
          url: '/warning-image',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          prepareHeaders,
          afterError,
        }),
      }),
  }),
  overrideExisting: true,
})

export const {
  useAddProjectWarningMutation,
  useAddProjectWarningImageMutation,
  useGetProjectsQuery,
} = constructionWorkEditorApi
