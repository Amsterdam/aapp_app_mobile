import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {
  BoatChargingEndpointName,
  type BoatChargingGeoJSON,
  type BoatChargingGuestLoginEndpointResponse,
  type BoatChargingLocationDetailsResponse,
} from '@/modules/boat-charging/types'
import {prepareHeaders} from '@/modules/boat-charging/utils/prepareHeaders'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const boatChargingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [BoatChargingEndpointName.boatChargingLocations]: builder.query<
      BoatChargingGeoJSON,
      void
    >({
      query: () => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: '/locations',
      }),
    }),
    [BoatChargingEndpointName.boatChargingLocationDetails]: builder.query<
      BoatChargingLocationDetailsResponse,
      string
    >({
      query: chargingPointId => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: `/locations/${chargingPointId}`,
      }),
      providesTags: ['BoatChargingLocationDetails'],
      keepUnusedDataFor: CacheLifetime.minute,
    }),
    [BoatChargingEndpointName.guestLogin]: builder.mutation<
      BoatChargingGuestLoginEndpointResponse,
      void
    >({
      query: body => ({
        body,
        method: 'POST',
        slug: ModuleSlug['boat-charging'],
        url: 'login/guest',
        afterError: (result, _api, failRetry) => {
          if (
            (
              [401, 403] as Array<FetchBaseQueryError['status'] | undefined>
            ).includes(result.error?.status)
          ) {
            failRetry(result.error)
          }
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useBoatChargingLocationsQuery,
  useBoatChargingLocationDetailsQuery,
  useGuestLoginMutation,
} = boatChargingApi
