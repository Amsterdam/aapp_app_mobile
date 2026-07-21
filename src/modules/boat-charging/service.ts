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
  type BoatChargingSessionInitRequest,
  type BoatChargingSessionInitResponse,
  type BoatChargingSocketStatusResponse,
  type BoatChargingTerms,
} from '@/modules/boat-charging/types'
import {prepareHeaders} from '@/modules/boat-charging/utils/prepareHeaders'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
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
      keepUnusedDataFor: CacheLifetime.hour,
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
    [BoatChargingEndpointName.boatChargingInitSession]: builder.mutation<
      BoatChargingSessionInitResponse,
      BoatChargingSessionInitRequest
    >({
      query: (body: BoatChargingSessionInitRequest) => ({
        prepareHeaders,
        slug: ModuleSlug['boat-charging'],
        url: '/sessions/init',
        method: 'POST',
        body,
      }),
    }),
    [BoatChargingEndpointName.boatChargingSocketStatus]: builder.query<
      BoatChargingSocketStatusResponse,
      string
    >({
      query: sessionId => ({
        prepareHeaders,
        slug: ModuleSlug['boat-charging'],
        url: `/sessions/${sessionId}/socket-status`,
      }),
    }),
    [BoatChargingEndpointName.boatChargingStartSession]: builder.mutation<
      void,
      string
    >({
      query: sessionId => ({
        prepareHeaders,
        slug: ModuleSlug['boat-charging'],
        url: `/sessions/${sessionId}/start`,
        method: 'POST',
        timeout: 180000, // 3 minutes
      }),
    }),
    [BoatChargingEndpointName.boatChargingStopSession]: builder.mutation<
      void,
      string
    >({
      query: sessionId => ({
        prepareHeaders,
        slug: ModuleSlug['boat-charging'],
        url: `/sessions/${sessionId}/stop`,
        method: 'POST',
        timeout: 60000, // 1 minute
      }),
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
  useBoatChargingInitSessionMutation,
  useBoatChargingSocketStatusQuery,
  useBoatChargingStartSessionMutation,
  useBoatChargingStopSessionMutation,
} = boatChargingApi
