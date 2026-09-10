import {DeviatingApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  type WasteGuideResponse,
  type WasteGuideRecyclePointsResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

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
  }),
  overrideExisting: true,
})

export const {useGetWasteGuideQuery, useGetWasteGuideRecyclePointsQuery} =
  wasteGuideApi
