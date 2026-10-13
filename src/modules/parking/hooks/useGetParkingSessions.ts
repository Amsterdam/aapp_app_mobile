import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useParkingSessionsInfiniteQuery,
  useVisitorParkingSessionsQuery,
} from '@/modules/parking/service'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingPermitScope, ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = (
  status: ParkingSessionStatus,
  options?: {skip: boolean},
) => {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()

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
        }
      : skipToken,
    {initialPageParam: 1, refetchOnMountOrArgChange: true, ...options},
  )
  const parkingSessions = parkingSessionsInfinite?.pages[0]

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
        }
      : skipToken,
    {refetchOnMountOrArgChange: true, ...options},
  )

  if (isVisitorSessionsActive) {
    return {
      isLoading: isLoadingVisitorParkingSessions,
      isError: isVisitorParkingSessionsError,
      parkingSessions: visitorParkingSessions?.[status],
      page: undefined,
      refetch: refetchVisitorParkingSessions,
    }
  }

  return {
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    parkingSessions: parkingSessions?.result,
    page: parkingSessions?.page,
    refetch: refetchParkingSessions,
  }
}
