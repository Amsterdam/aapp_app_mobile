import {DeviatingApiSlug, GlobalApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  type WasteGuideResponse,
  type WasteGuideNotificationSettings,
  type WasteGuideRecyclePointsResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
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
    // notifications:
    [WasteGuideEndpointName.getWasteGuideNotification]: builder.query<
      WasteGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: GlobalApiSlug.notification,
        url: '/device/waste',
        headers: deviceIdHeader,
      }),
      providesTags: ['WasteGuideNotifications'],
      keepUnusedDataFor: CacheLifetime.day,
    }),
    [WasteGuideEndpointName.postWasteGuideNotification]: builder.mutation<
      WasteGuideNotificationSettings,
      string
    >({
      query: bag_nummeraanduiding_id => ({
        body: {bag_nummeraanduiding_id},
        slug: GlobalApiSlug.notification,
        url: '/device/waste',
        headers: deviceIdHeader,
        method: 'POST',
      }),
      invalidatesTags: ['WasteGuideNotifications'],
    }),
    [WasteGuideEndpointName.deleteWasteGuideNotification]: builder.mutation<
      WasteGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: GlobalApiSlug.notification,
        url: '/device/waste',
        headers: deviceIdHeader,
        method: 'DELETE',
      }),
      invalidatesTags: ['WasteGuideNotifications'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetWasteGuideQuery,
  useGetWasteGuideNotificationQuery,
  useGetWasteGuideRecyclePointsQuery,
  usePostWasteGuideNotificationMutation,
  useDeleteWasteGuideNotificationMutation,
} = wasteGuideApi
