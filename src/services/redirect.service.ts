import {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {RedirectEndpointName} from '@/modules/redirects/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const redirectApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [RedirectEndpointName.getRedirectUrls]: builder.query<
      Record<RedirectKey, string>,
      void
    >({
      query: () => ({
        slug: ModuleSlug.contact,
        url: '/links',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {useGetRedirectUrlsQuery} = redirectApi
