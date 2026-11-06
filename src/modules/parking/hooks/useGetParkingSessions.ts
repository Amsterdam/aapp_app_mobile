import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
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
import {sortByDate} from '@/utils/sort/sortByDate'

type UseGetParkingSessionsReturn = {
  isError: boolean
  isLoading: boolean
  page?: Paginated<unknown>['page']
  parkingSessions?: VisitorParkingSessionsEndpointResponse | ParkingSession[]
  refetch:
    | ReturnType<typeof useParkingSessionsInfiniteQuery>['refetch']
    | ReturnType<typeof useVisitorParkingSessionsQuery>['refetch']
}

type Options = {skip?: boolean; sortAscending?: boolean}

export function useGetParkingSessions(
  /**
   * Pass a boolean to overwrite status and retrieve all active or planned sessions in the upcoming 24 hours.
   */
  next_24_hours?: boolean,
  options?: Options,
): UseGetParkingSessionsReturn
export function useGetParkingSessions(
  /**
   * Pass a ParkingSessionStatus to retrieve only sessions with given status.
   */
  status?: ParkingSessionStatus,
  options?: Options,
): UseGetParkingSessionsReturn

export function useGetParkingSessions(
  sessionStatusOrNext24Hours?: ParkingSessionStatus | boolean,
  options?: Options,
) {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()
  const {skip, sortAscending = false} = options ?? {}

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
    {initialPageParam: 1, refetchOnMountOrArgChange: true, skip},
  )
  const permitHolderParkingSessions = parkingSessionsInfinite?.pages[0]

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

  const parkingSessions = useMemo(() => {
    const sessions =
      visitorParkingSessions || permitHolderParkingSessions?.result

    if (!sessions) {
      return
    }

    return sortByDate(sessions, sortAscending)
  }, [
    visitorParkingSessions,
    permitHolderParkingSessions?.result,
    sortAscending,
  ])

  if (isVisitorSessionsActive) {
    return {
      isLoading: isLoadingVisitorParkingSessions,
      isError: isVisitorParkingSessionsError,
      parkingSessions,
      page: undefined,
      refetch: refetchVisitorParkingSessions,
    }
  }

  return {
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    parkingSessions,
    page: permitHolderParkingSessions?.page,
    refetch: refetchParkingSessions,
  }
}
