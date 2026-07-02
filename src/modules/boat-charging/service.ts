import type {
  QueryReturnValue,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import {setBoatChargingOpenIdConnectConfig} from '@/modules/boat-charging/slice'
import {
  BoatChargingEndpointName,
  type BoatChargingGeoJSON,
  type BoatChargingLocationDetailsResponse,
  type BoatChargingOIDCConfigResponse,
  type BoatChargingSession,
  type BoatChargingTerms,
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
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: `/locations/${chargingPointId}`,
      }),
      providesTags: ['BoatChargingLocationDetails'],
      keepUnusedDataFor: CacheLifetime.minute,
    }),
    [BoatChargingEndpointName.boatChargingOpenIdConnectConfig]: builder.query<
      BoatChargingOIDCConfigResponse,
      void
    >({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: '/oidc-settings',
        afterSuccess: (
          response: QueryReturnValue<
            BoatChargingOIDCConfigResponse,
            FetchBaseQueryError,
            FetchBaseQueryMeta
          >,
          {dispatch},
        ) => {
          if (response.data) {
            dispatch(setBoatChargingOpenIdConnectConfig(response.data))
          }
        },
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),
    [BoatChargingEndpointName.boatChargingTerms]: builder.query<
      BoatChargingTerms,
      void
    >({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: '/terms',
      }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),
    [BoatChargingEndpointName.boatChargingSessions]: builder.query<
      BoatChargingSession[],
      void
    >({
      query: () => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug['boat-charging'],
        url: '/sessions',
      }),
      providesTags: ['BoatChargingSessions'],
      keepUnusedDataFor: CacheLifetime.minute,
    }),
  }),
  overrideExisting: false,
})

export const {
  useBoatChargingLocationsQuery,
  useBoatChargingLocationDetailsQuery,
  useBoatChargingOpenIdConnectConfigQuery,
  useBoatChargingTermsQuery,
  useBoatChargingSessionsQuery,
} = boatChargingApi
