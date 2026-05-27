import type {ArticlesQueryArgs, ArticlesResponse} from '@/modules/news/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    articles: builder.query<ArticlesResponse, ArticlesQueryArgs>({
      query: args => ({
        url: '/articles',
        slug: ModuleSlug.news,
        params: args,
      }),
    }),
  }),
  overrideExisting: false,
})
