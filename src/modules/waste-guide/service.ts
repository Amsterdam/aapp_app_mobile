import {DeviatingApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  WasteGuideResponse,
  type WasteGuideNotificationSettings,
  type WasteGuideRecyclePointsResponse,
} from '@/modules/waste-guide/types'
import {
  updateCalendarEventLabels,
  updateFractionLabels,
} from '@/modules/waste-guide/utils/updateFractionLabels'
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
      transformResponse: (
        baseQueryReturnValue: unknown,
      ): WasteGuideResponse => {
        const value = baseQueryReturnValue as WasteGuideResponse

        if (value && Array.isArray(value.waste_types)) {
          return {
            ...value,
            calendar: updateCalendarEventLabels(value.calendar),
            waste_types: updateFractionLabels(value.waste_types),
          }
        }

        return value
      },
    }),
    [WasteGuideEndpointName.getWasteGuideNotification]: builder.query<
      WasteGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: DeviatingApiSlug.waste,
        url: '/guide/notification',
        headers: deviceIdHeader,
      }),
      providesTags: ['WasteGuideNotifications'],
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
    [WasteGuideEndpointName.postWasteGuideNotification]: builder.mutation<
      WasteGuideNotificationSettings,
      string
    >({
      query: bag_nummeraanduiding_id => ({
        body: {bag_nummeraanduiding_id},
        slug: DeviatingApiSlug.waste,
        url: '/guide/notifications',
        headers: deviceIdHeader,
        method: 'POST',
      }),
      invalidatesTags: ['WasteGuideNotifications'],
    }),
    [WasteGuideEndpointName.patchWasteGuideNotification]: builder.mutation<
      WasteGuideNotificationSettings,
      string
    >({
      query: bag_nummeraanduiding_id => ({
        body: {bag_nummeraanduiding_id},
        slug: DeviatingApiSlug.waste,
        url: '/guide/notification',
        headers: deviceIdHeader,
        method: 'PATCH',
      }),
      invalidatesTags: ['WasteGuideNotifications'],
    }),
    [WasteGuideEndpointName.deleteWasteGuideNotification]: builder.mutation<
      WasteGuideNotificationSettings,
      void
    >({
      query: () => ({
        slug: DeviatingApiSlug.waste,
        url: '/guide/notification',
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
  usePatchWasteGuideNotificationMutation,
  useDeleteWasteGuideNotificationMutation,
} = wasteGuideApi
