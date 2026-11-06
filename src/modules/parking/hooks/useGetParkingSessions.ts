import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useParkingSessionsInfiniteQuery,
  useVisitorParkingSessionsQuery,
} from '@/modules/parking/service'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {
  ParkingPermitScope,
  ParkingSessionStatus,
  type ParkingSession,
  type VisitorParkingSessionsEndpointResponse,
} from '@/modules/parking/types'
import type {Paginated} from '@/types/api'

type UseGetParkingSessionsReturn = {
  isError: boolean
  isLoading: boolean
  page?: Paginated<unknown>['page']
  parkingSessions?: VisitorParkingSessionsEndpointResponse | ParkingSession[]
  refetch:
    | ReturnType<typeof useParkingSessionsInfiniteQuery>['refetch']
    | ReturnType<typeof useVisitorParkingSessionsQuery>['refetch']
}

export function useGetParkingSessions(
  /**
   * Pass a boolean to overwrite status and retrieve all active or planned sessions in the upcoming 24 hours.
   */
  next_24_hours?: boolean,
  options?: {skip: boolean},
): UseGetParkingSessionsReturn
export function useGetParkingSessions(
  /**
   * Pass a ParkingSessionStatus to retrieve only sessions with given status.
   */
  status?: ParkingSessionStatus,
  options?: {skip: boolean},
): UseGetParkingSessionsReturn

export function useGetParkingSessions(
  sessionStatusOrNext24Hours?: ParkingSessionStatus | boolean,
  options?: {skip: boolean},
) {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()

  const next_24_hours =
    typeof sessionStatusOrNext24Hours === 'boolean'
      ? sessionStatusOrNext24Hours
      : undefined
  const status =
    typeof sessionStatusOrNext24Hours !== 'boolean'
      ? sessionStatusOrNext24Hours
      : undefined

  const isPermitHolderSessionsActive =
    !!currentPermit && parkingAccount?.scope === ParkingPermitScope.permitHolder

  const isVisitorSessionsActive =
    parkingAccount?.scope === ParkingPermitScope.visitor && !!visitorVehicleId

  const {
    currentData: parkingSessionsInfinite,
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    refetch: refetchParkingSessions,
  } = useParkingSessionsInfiniteQuery(
    isPermitHolderSessionsActive
      ? {
          report_code: currentPermit.report_code.toString(),
          status,
          page_size: 100,
          next_24_hours,
        }
      : skipToken,
    {initialPageParam: 1, refetchOnMountOrArgChange: true, ...options},
  )
  const {page, result: parkingSessions} =
    parkingSessionsInfinite?.pages[0] ?? {}

  const {
    currentData: visitorParkingSessions,
    isLoading: isLoadingVisitorParkingSessions,
    isError: isVisitorParkingSessionsError,
    refetch: refetchVisitorParkingSessions,
  } = useVisitorParkingSessionsQuery(
    isVisitorSessionsActive
      ? {
          vehicle_id: visitorVehicleId,
          report_code: currentPermit.report_code.toString(),
          status,
          next_24_hours,
        }
      : skipToken,
    {refetchOnMountOrArgChange: true, ...options},
  )

  if (isVisitorSessionsActive) {
    return {
      isLoading: isLoadingVisitorParkingSessions,
      isError: isVisitorParkingSessionsError,
      parkingSessions: visitorParkingSessions,
      page: undefined,
      refetch: refetchVisitorParkingSessions,
    }
  }

  return {
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    parkingSessions: parkingSessions,
    page,
    refetch: refetchParkingSessions,
  }
}
