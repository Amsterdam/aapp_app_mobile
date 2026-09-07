import {GlobalApiSlug} from '@/environment'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'

enum NotificationEndpointName {
  deleteNotificationSubscription = 'deleteNotificationSubscription',
  getNotificationSubscription = 'getNotificationSubscription',
  postNotificationSubscription = 'postNotificationSubscription',
}

export type NotificationSubscriptionSettings = (
  | {
      message: string
      status: 'error'
    }
  | {
      message: never
      status: 'success'
    }
) & {
  optimistic?: true
}

export enum NotificationSubscriptionType {
  burningGuide = 'burning-guide',
  wasteGuide = 'waste',
}

export type NotificationSubscriptionPostParams =
  | {
      bag_nummeraanduiding_id: string
      notificationSubscriptionType: NotificationSubscriptionType.wasteGuide
    }
  | {
      notificationSubscriptionType: NotificationSubscriptionType.burningGuide
      postal_code: string
    }

const updateGETNotificationSubscription = (
  notificationSubscriptionType: NotificationSubscriptionType,
  newValue: boolean,
  optimistic: boolean,
) =>
  notificationApi.util.updateQueryData(
    NotificationEndpointName.getNotificationSubscription,
    notificationSubscriptionType,
    draft => {
      Object.assign(draft, {
        status: newValue ? 'success' : 'error',
        message: newValue ? undefined : 'not found',
        optimistic: optimistic ? true : undefined,
      })
    },
  )

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // notifications:
    [NotificationEndpointName.getNotificationSubscription]: builder.query<
      NotificationSubscriptionSettings,
      NotificationSubscriptionType
    >({
      query: notificationSubscriptionType => ({
        slug: GlobalApiSlug.notification,
        url: `/device/${notificationSubscriptionType}`,
        headers: deviceIdHeader,
      }),
      providesTags: ['NotificationSubscriptions'],
      keepUnusedDataFor: CacheLifetime.day,
    }),
    [NotificationEndpointName.postNotificationSubscription]: builder.mutation<
      NotificationSubscriptionSettings,
      NotificationSubscriptionPostParams
    >({
      query: ({notificationSubscriptionType, ...rest}) => ({
        body: rest,
        slug: GlobalApiSlug.notification,
        url: `/device/${notificationSubscriptionType}`,
        headers: deviceIdHeader,
        method: 'POST',
        afterSuccess: (_result, {dispatch}) => {
          dispatch(
            updateGETNotificationSubscription(
              notificationSubscriptionType,
              true,
              false,
            ),
          )
        },
        afterError: (_error, {dispatch}) => {
          dispatch(
            updateGETNotificationSubscription(
              notificationSubscriptionType,
              false,
              false,
            ),
          )
          dispatch(
            notificationApi.util.invalidateTags(['NotificationSubscriptions']),
          )
        },
      }),
      onQueryStarted: ({notificationSubscriptionType}, {dispatch}) => {
        dispatch(
          updateGETNotificationSubscription(
            notificationSubscriptionType,
            true,
            true,
          ),
        )
      },
    }),
    [NotificationEndpointName.deleteNotificationSubscription]: builder.mutation<
      NotificationSubscriptionSettings,
      NotificationSubscriptionType
    >({
      query: notificationSubscriptionType => ({
        slug: GlobalApiSlug.notification,
        url: `/device/${notificationSubscriptionType}`,
        headers: deviceIdHeader,
        method: 'DELETE',
        afterSuccess: (_result, {dispatch}) => {
          dispatch(
            updateGETNotificationSubscription(
              notificationSubscriptionType,
              false,
              false,
            ),
          )
        },
        afterError: (_error, {dispatch}) => {
          dispatch(
            updateGETNotificationSubscription(
              notificationSubscriptionType,
              false,
              false,
            ),
          )
          dispatch(
            notificationApi.util.invalidateTags(['NotificationSubscriptions']),
          )
        },
      }),

      onQueryStarted: (notificationSubscriptionType, {dispatch}) => {
        dispatch(
          updateGETNotificationSubscription(
            notificationSubscriptionType,
            false,
            true,
          ),
        )
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetNotificationSubscriptionQuery,
  usePostNotificationSubscriptionMutation,
  useDeleteNotificationSubscriptionMutation,
} = notificationApi
