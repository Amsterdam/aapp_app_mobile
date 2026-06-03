import {
  NewsEndpointName,
  type NewsArticlesResponse,
  type NewsArticleResponse,
  type NewsArticlesQueryArgs,
  type DistrictsResponse,
  type NewsLiveblogNotificationsResponse,
} from '@/modules/news/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'

export const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [NewsEndpointName.articles]: builder.query<
      NewsArticlesResponse,
      NewsArticlesQueryArgs
    >({
      query: args => ({
        url: '/articles',
        slug: ModuleSlug.news,
        params: args,
      }),
    }),
    [NewsEndpointName.article]: builder.query<NewsArticleResponse, number>({
      query: id => ({
        method: 'GET',
        slug: ModuleSlug.news,
        url: `/articles/${id}`,
      }),
    }),
    [NewsEndpointName.districts]: builder.query<DistrictsResponse, void>({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug.news,
        url: '/districts',
      }),
    }),
    [NewsEndpointName.getLiveblogNotifications]: builder.query<
      NewsLiveblogNotificationsResponse,
      number
    >({
      query: articleId => ({
        method: 'GET',
        slug: ModuleSlug.news,
        url: `/liveblog-notifications/${articleId}`,
        headers: deviceIdHeader,
      }),
      providesTags: ['NewsLiveblogNotifications'],
    }),
    [NewsEndpointName.postLiveblogNotifications]: builder.mutation<
      NewsLiveblogNotificationsResponse,
      number
    >({
      query: articleId => ({
        method: 'POST',
        slug: ModuleSlug.news,
        url: `/liveblog-notifications/${articleId}`,
        headers: deviceIdHeader,
      }),
      invalidatesTags: ['NewsLiveblogNotifications'],
    }),
    [NewsEndpointName.deleteLiveblogNotifications]: builder.mutation<
      void,
      number
    >({
      query: articleId => ({
        method: 'DELETE',
        slug: ModuleSlug.news,
        url: `/liveblog-notifications/${articleId}`,
        headers: deviceIdHeader,
      }),
      invalidatesTags: ['NewsLiveblogNotifications'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useNewsArticleQuery,
  useNewsArticlesQuery,
  useNewsDistrictsQuery,
  useNewsGetLiveblogNotificationsQuery,
  useNewsPostLiveblogNotificationsMutation,
  useNewsDeleteLiveblogNotificationsMutation,
} = newsApi
