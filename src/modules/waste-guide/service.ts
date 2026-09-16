import {DeviatingApiSlug, GlobalApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  type WasteGuideResponse,
  type WasteGuideRecyclePointsResponse,
  type WasteGuideSortingGuideSearchQueryArgs,
  type WasteGuideSortingGuideSearchResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

const DEFAULT_SEARCH_PAGE_SIZE = 100

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getWasteGuide]: builder.query<
      WasteGuideResponse,
      string
    >({
      query: bag_nummeraanduiding_id => ({
        params: {bag_nummeraanduiding_id},
        slug: DeviatingApiSlug.waste,
        url: '/guide',
      }),
      keepUnusedDataFor: CacheLifetime.day,
    }),
    [WasteGuideEndpointName.getWasteGuideRecyclePoints]: builder.query<
      WasteGuideRecyclePointsResponse,
      void
    >({
      query: () => ({
        slug: DeviatingApiSlug.waste,
        url: '/recycle-locations',
      }),
      keepUnusedDataFor: CacheLifetime.day,
    }),

    // /sorting-guide/search GET
    [WasteGuideEndpointName.getWasteGuideSortingGuideSearch]: builder.query<
      WasteGuideSortingGuideSearchResponse,
      WasteGuideSortingGuideSearchQueryArgs
    >({
      query: params => ({
        params: {
          page_size: DEFAULT_SEARCH_PAGE_SIZE,
          ...params,
        },
        slug: GlobalApiSlug.bridge,
        url: '/afvalscheidingswijzer',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    [WasteGuideEndpointName.getWasteGuideSortingGuideDetails]: builder.query<
      WasteGuideSortingGuideSearchResponse,
      WasteGuideSortingGuideSearchQueryArgs
    >({
      query: params => ({
        params: {
          page_size: DEFAULT_SEARCH_PAGE_SIZE,
          ...params,
        },
        slug: GlobalApiSlug.bridge,
        url: '/afvalscheidingswijzer',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetWasteGuideQuery,
  useGetWasteGuideRecyclePointsQuery,
  useGetWasteGuideSortingGuideSearchQuery,
  useGetWasteGuideSortingGuideDetailsQuery,
} = wasteGuideApi
