import {
  ArticlesQueryArgs,
  ArticlesResponse,
  FollowProjectBody,
  ProjectDetailsQueryArgs,
  ProjectDetailsResponse,
  ProjectNewsQueryArgs,
  ProjectNewsResponse,
  ProjectWarningQueryArgs,
  ProjectWarningResponse,
  ConstructionWorkEndpointName,
  ProjectsQueryArgs,
  ProjectsResponse,
  ProjectsSearchQueryArgs,
  ProjectsSearchResponse,
} from '@/modules/construction-work/types/api'
import {processSearchQueryArgs} from '@/modules/construction-work/utils/processSearchQueryArgs'
import {tempPostProcessProjectDetails} from '@/modules/construction-work/utils/tempPostProcessProjectDetails'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const DEFAULT_SEARCH_PAGE_SIZE = 1000
const MODULE_SLUG = ModuleSlug['construction-work']

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // /articles GET
    [ConstructionWorkEndpointName.articles]: builder.query<
      ArticlesResponse,
      ArticlesQueryArgs
    >({
      providesTags: ['Articles'],
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({
          path: '/articles',
          params,
        }),
      }),

      keepUnusedDataFor: CacheLifetime.minute,
    }),

    // /project/details GET
    [ConstructionWorkEndpointName.projectDetails]: builder.query<
      ProjectDetailsResponse,
      ProjectDetailsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/details', params}),
        headers: deviceIdHeader,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: tempPostProcessProjectDetails,
    }),

    // /project/news GET
    [ConstructionWorkEndpointName.projectNews]: builder.query<
      ProjectNewsResponse,
      ProjectNewsQueryArgs
    >({
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/news', params}),
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),

    // /project/warning GET
    [ConstructionWorkEndpointName.projectWarning]: builder.query<
      ProjectWarningResponse,
      ProjectWarningQueryArgs
    >({
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/warning', params}),
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),

    // /projects GET
    [ConstructionWorkEndpointName.projects]: builder.query<
      ProjectsResponse,
      ProjectsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: '/projects',
        params,
        headers: deviceIdHeader,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /projects/follow DELETE
    [ConstructionWorkEndpointName.projectUnfollow]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        body,
        method: 'DELETE',
        slug: MODULE_SLUG,
        url: '/projects/follow',
        headers: deviceIdHeader,
      }),
    }),

    // /projects/follow POST
    [ConstructionWorkEndpointName.projectFollow]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        body,
        method: 'POST',
        slug: MODULE_SLUG,
        url: '/projects/follow',
        headers: deviceIdHeader,
      }),
    }),

    // /projects/search GET
    [ConstructionWorkEndpointName.projectsSearch]: builder.query<
      ProjectsSearchResponse,
      ProjectsSearchQueryArgs
    >({
      providesTags: ['Projects'],
      query: params => ({
        params: {
          page_size: DEFAULT_SEARCH_PAGE_SIZE,
          ...processSearchQueryArgs(params),
        },
        slug: MODULE_SLUG,
        url: '/projects/search',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {
  useArticlesQuery,
  useProjectDetailsQuery,
  useProjectFollowMutation,
  useProjectNewsQuery,
  useProjectUnfollowMutation,
  useProjectWarningQuery,
  useProjectsQuery,
  useProjectsSearchQuery,
} = projectsApi
