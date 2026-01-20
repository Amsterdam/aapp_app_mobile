import {GlobalApiSlug} from '@/environment'
import {GetNotificationsResult} from '@/modules/notification-history/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'
import {dayjs} from '@/utils/datetime/dayjs'

const mockNotifications: GetNotificationsResult = [
  {
    body: 'testBody',
    context: {
      linkSourceid: '1234',
      module_slug: ModuleSlug['burning-guide'],
      url: 'https://amsterdam.nl',
    },
    created_at: dayjs().toISOString(),
    id: '1234',
    is_read: false,
    module_slug: ModuleSlug['burning-guide'],
    pushed_at: dayjs().toISOString(),
    title: 'testTitle',
  },
  {
    body: 'testBody2',
    context: {
      linkSourceid: '4321',
      module_slug: ModuleSlug['burning-guide'],
    },
    created_at: dayjs().toISOString(),
    id: '4321',
    is_read: false,
    module_slug: ModuleSlug['burning-guide'],
    pushed_at: dayjs().toISOString(),
    title: 'testTitle2',
  },
]

const notificationHistoryApi = baseApi.injectEndpoints({
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
      transformResponse: (response: GetNotificationsResult) => [
        ...response,
        ...mockNotifications,
      ],
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
  }),
  overrideExisting: true,
})

export const {useGetNotificationsQuery, useMarkAllNotificationsReadMutation} =
  notificationHistoryApi
