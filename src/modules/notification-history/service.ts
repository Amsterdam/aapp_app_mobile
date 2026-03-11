import {GlobalApiSlug} from '@/environment'
import {GetNotificationsResult} from '@/modules/notification-history/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

export const notificationHistoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsResult | undefined, void>({
      providesTags: ['Notifications'],
      query: () => ({
        slug: GlobalApiSlug.notification,
        url: generateRequestUrl({
          path: '/notifications',
          params: {},
        }),
        headers: deviceIdHeader,
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),
    markAllNotificationsRead: builder.mutation<void, void>({
      invalidatesTags: ['Notifications'],
      query: () => ({
        slug: GlobalApiSlug.notification,
        method: 'POST',
        url: generateRequestUrl({
          path: '/notifications/mark_all_read',
          params: {},
        }),
        headers: deviceIdHeader,
      }),
    }),
    markSingleNotificationRead: builder.mutation<
      void,
      {isRead: boolean; notificationId: string}
    >({
      invalidatesTags: ['Notifications'],
      query: ({notificationId, isRead}) => ({
        slug: GlobalApiSlug.notification,
        method: 'PATCH',
        url: `/notifications/${notificationId}`,
        headers: deviceIdHeader,
        body: {is_read: isRead},
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkSingleNotificationReadMutation,
} = notificationHistoryApi
