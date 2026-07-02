import type {
  QueryReturnValue,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import {setBoatChargingOpenIdConnectConfig} from '@/modules/boat-charging/slice'
import {
  BoatChargingEndpointName,
  ChargingPointStatus,
  type BoatChargingGeoJSON,
  type BoatChargingLocationDetailsResponse,
  type BoatChargingOIDCConfigResponse,
} from '@/modules/boat-charging/types'
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
      transformResponse: (data: BoatChargingLocationDetailsResponse) => ({
        ...data,
        charging_stations: [
          ...data.charging_stations,
          {
            status: ChargingPointStatus.OPERATIVE,
            evses: [],
            id: '12345',
            location_id: data.id,
          },
          {
            status: ChargingPointStatus.INOPERATIVE,
            evses: [],
            id: '12346',
            location_id: data.id,
          },
          {
            status: ChargingPointStatus.UNKNOWN,
            evses: [],
            id: '12347',
            location_id: data.id,
          },
          {
            status: ChargingPointStatus.OPERATIVE,
            evses: [],
            id: '12349',
            location_id: data.id,
          },
          {
            status: ChargingPointStatus.OCCUPIED,
            evses: [],
            id: '12348',
            location_id: data.id,
          },
        ],
      }),
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
  }),
  overrideExisting: false,
})

export const {
  useBoatChargingLocationsQuery,
  useBoatChargingLocationDetailsQuery,
  useBoatChargingOpenIdConnectConfigQuery,
} = boatChargingApi
