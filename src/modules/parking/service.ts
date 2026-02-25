import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {setCurrentApiVersion} from '@/modules/parking/slice'
import {
  type ParkingAccountDetails,
  type LicensePlatesEndpointRequest,
  type LicensePlatesEndpointResponse,
  type ParkingLoginEndpointRequest,
  type ParkingLoginEndpointResponse,
  type ParkingPermitsEndpointResponse,
  type RemoveLicensePlateEndpointRequest,
  type RemoveLicensePlateEndpointResponse,
  type AddLicensePlateEndpointRequest,
  type AddLicensePlateEndpointResponse,
  type ParkingSessionsEndpointResponse,
  type ParkingSessionsEndpointRequest,
  type ParkingSessionReceiptEndpointResponse,
  type ParkingSessionReceiptEndpointRequestParams,
  type ParkingStartSessionEndpointRequestParams,
  type ParkingPermitsEndpointRequestParams,
  type ParkingOrderResponse,
  type ParkingEditSessionEndpointRequestParams,
  type ParkingDeleteSessionEndpointRequestParams,
  type RemoveIncreaseBalanceEndpointRequest,
  type ParkingTransactionsEndpointRequest,
  type ParkingTransactionsEndpointResponse,
  type VisitorParkingSessionsEndpointRequest,
  type VisitorParkingSessionsEndpointResponse,
  ParkingSessionStatus,
  type ParkingManageVisitorTimeBalanceEndpointRequest,
  ParkingEndpointName,
  type ParkingSessionHistoryEndpointRequest,
  type ParkingSessionHistoryEndpointResponse,
  type ParkingZoneByMachineEndpointRequest,
  type PaymentZone,
  type ParkingMachine,
  type ActivateLicensePlateEndpointRequest,
  type ActivateLicensePlateEndpointResponse,
  type ConfirmBalanceEndpointRequest,
  type PermitZoneGeoJsonResponse,
} from '@/modules/parking/types'
import {afterError} from '@/modules/parking/utils/afterError'
import {prepareHeaders} from '@/modules/parking/utils/prepareHeaders'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

export const parkingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ParkingEndpointName.accountDetails]: builder.query<
      ParkingAccountDetails,
      void
    >({
      providesTags: ['ParkingAccount'],
      query: () => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: '/account-details',
        afterError,
      }),
    }),
    [ParkingEndpointName.addLicensePlate]: builder.mutation<
      AddLicensePlateEndpointResponse,
      AddLicensePlateEndpointRequest
    >({
      invalidatesTags: ['ParkingLicensePlates'],
      query: body => ({
        prepareHeaders,
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/license-plate',
        afterError,
      }),
    }),
    [ParkingEndpointName.licensePlates]: builder.query<
      LicensePlatesEndpointResponse,
      LicensePlatesEndpointRequest
    >({
      providesTags: ['ParkingLicensePlates'],
      query: ({reportCode}) => ({
        prepareHeaders,
        method: 'GET',
        params: {report_code: reportCode},
        slug: ModuleSlug.parking,
        url: '/license-plates',
        afterError,
      }),
    }),
    [ParkingEndpointName.login]: builder.mutation<
      ParkingLoginEndpointResponse,
      ParkingLoginEndpointRequest
    >({
      query: body => ({
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/login',
        afterError: (result, _api, failRetry) => {
          if (
            (
              [401, 403] as Array<FetchBaseQueryError['status'] | undefined>
            ).includes(result.error?.status)
          ) {
            failRetry(result.error)
          }
        },
        afterSuccess: ({data}, {dispatch}) => {
          dispatch(
            setCurrentApiVersion(
              (data as ParkingLoginEndpointResponse).version,
            ),
          )
        },
      }),
    }),
    [ParkingEndpointName.parkingSessionHistory]: builder.query<
      ParkingSessionHistoryEndpointResponse,
      ParkingSessionHistoryEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: params => ({
        prepareHeaders,
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/sessions/history',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.second * 3,
    }),
    [ParkingEndpointName.parkingSessions]: builder.query<
      ParkingSessionsEndpointResponse,
      ParkingSessionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/sessions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    [ParkingEndpointName.parkingTransactions]: builder.query<
      ParkingTransactionsEndpointResponse,
      ParkingTransactionsEndpointRequest
    >({
      providesTags: ['ParkingTransactions'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/transactions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.second * 3,
    }),
    [ParkingEndpointName.permits]: builder.query<
      ParkingPermitsEndpointResponse,
      ParkingPermitsEndpointRequestParams
    >({
      providesTags: ['ParkingPermits'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/permits', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.permitZones]: builder.query<
      // Endpoint is only V2
      PermitZoneGeoJsonResponse,
      string
    >({
      providesTags: ['ParkingPermits'],
      query: report_code => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: `/permit/${report_code}/zones`,
        afterError,
      }),
    }),
    [ParkingEndpointName.parkingMachines]: builder.query<
      // Endpoint is only V2
      ParkingMachine[],
      void
    >({
      query: () => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: '/parking-machines',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.day,
    }),

    [ParkingEndpointName.zoneByMachine]: builder.query<
      // Endpoint is only V2
      PaymentZone,
      ParkingZoneByMachineEndpointRequest
    >({
      providesTags: ['ParkingPermits'],
      query: ({report_code, machineId}) => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: `/permit/${report_code}/zone_by_machine/${machineId}`,
        afterError,
      }),
    }),
    [ParkingEndpointName.sessionReceipt]: builder.query<
      ParkingSessionReceiptEndpointResponse,
      ParkingSessionReceiptEndpointRequestParams
    >({
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/session/receipt', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.startSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingStartSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions', 'ParkingAccount', 'ParkingPermits'],
      query: body => ({
        headers: deviceIdHeader,
        prepareHeaders,
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/session',
        afterError,
      }),
    }),
    [ParkingEndpointName.editSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingEditSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions', 'ParkingAccount', 'ParkingPermits'],
      query: body => ({
        headers: deviceIdHeader,
        prepareHeaders,
        body,
        method: 'PATCH',
        slug: ModuleSlug.parking,
        url: '/session',
        afterError,
      }),
    }),
    [ParkingEndpointName.deleteSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingDeleteSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions', 'ParkingAccount', 'ParkingPermits'],
      query: ({...params}) => ({
        headers: deviceIdHeader,
        prepareHeaders,
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/session', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.activateSession]: builder.mutation<
      ActivateLicensePlateEndpointResponse,
      ActivateLicensePlateEndpointRequest
    >({
      invalidatesTags: ['ParkingSessions', 'ParkingAccount', 'ParkingPermits'],
      query: body => ({
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/session/activate',
        afterError,
        body,
      }),
    }),
    [ParkingEndpointName.removeLicensePlate]: builder.mutation<
      RemoveLicensePlateEndpointResponse,
      RemoveLicensePlateEndpointRequest
    >({
      invalidatesTags: ['ParkingLicensePlates'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/license-plate', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.increaseBalance]: builder.mutation<
      ParkingOrderResponse,
      RemoveIncreaseBalanceEndpointRequest
    >({
      invalidatesTags: ['ParkingAccount'],
      query: body => ({
        body,
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/balance',
        afterError,
      }),
    }),
    [ParkingEndpointName.confirmBalance]: builder.mutation<
      void,
      ConfirmBalanceEndpointRequest
    >({
      invalidatesTags: ['ParkingAccount'],
      query: body => ({
        headers: deviceIdHeader,
        body,
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/balance-confirm',
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorAddAccount]: builder.mutation<
      void,
      string
    >({
      invalidatesTags: ['ParkingPermits', 'ParkingAccount'],
      query: report_code => ({
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: `/permit/${report_code}/visitor`,
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorRemoveAccount]: builder.mutation<
      void,
      string
    >({
      invalidatesTags: ['ParkingPermits', 'ParkingAccount'],
      query: report_code => ({
        prepareHeaders,
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: `/permit/${report_code}/visitor`,
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorTimeBalance]: builder.mutation<
      void,
      ParkingManageVisitorTimeBalanceEndpointRequest
    >({
      invalidatesTags: ['ParkingPermits'],
      query: body => ({
        prepareHeaders,
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/visitor/time-balance',
        afterError,
      }),
    }),
    [ParkingEndpointName.visitorParkingSessions]: builder.query<
      Record<ParkingSessionStatus, VisitorParkingSessionsEndpointResponse>,
      VisitorParkingSessionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/visitor/sessions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (
        response: VisitorParkingSessionsEndpointResponse,
      ) => ({
        [ParkingSessionStatus.active]:
          response.filter(
            session => session.status === ParkingSessionStatus.active,
          ) || [],
        [ParkingSessionStatus.completed]:
          response.filter(
            session => session.status === ParkingSessionStatus.completed,
          ) || [],
        [ParkingSessionStatus.cancelled]:
          response.filter(
            session => session.status === ParkingSessionStatus.cancelled,
          ) || [],
        [ParkingSessionStatus.planned]:
          response.filter(
            session => session.status === ParkingSessionStatus.planned,
          ) || [],
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useAccountDetailsQuery,
  useAddLicensePlateMutation,
  useConfirmBalanceMutation,
  useLicensePlatesQuery,
  useLoginMutation: useLoginParkingMutation,
  useParkingSessionHistoryQuery,
  useParkingSessionsQuery,
  useParkingTransactionsQuery,
  useRemoveLicensePlateMutation,
  useParkingMachinesQuery,
  useZoneByMachineQuery,
  usePermitsQuery,
  usePermitZonesQuery,
  useSessionReceiptQuery,
  useStartSessionMutation,
  useEditSessionMutation,
  useDeleteSessionMutation,
  useActivateSessionMutation,
  useIncreaseBalanceMutation,
  useManageVisitorTimeBalanceMutation,
  useManageVisitorAddAccountMutation,
  useManageVisitorRemoveAccountMutation,
  useVisitorParkingSessionsQuery,
} = parkingApi
