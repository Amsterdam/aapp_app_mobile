import {
  NewsEndpointName,
  type NewsArticlesResponse,
  type NewsArticleResponse,
  type NewsArticlesQueryArgs,
} from '@/modules/news/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

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
  }),
  overrideExisting: false,
})

export const {useNewsArticleQuery, useNewsArticlesQuery} = newsApi
