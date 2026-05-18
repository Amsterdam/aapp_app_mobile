import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useParkingSessionsQuery,
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

  const {
    currentData: parkingSessions,
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    refetch: refetchParkingSessions,
  } = useParkingSessionsQuery(
    currentPermit && parkingAccount?.scope === ParkingPermitScope.permitHolder
      ? {
          report_code: currentPermit.report_code.toString(),
          status,
          page_size: 100,
        }
      : skipToken,
    options,
  )

  const {
    currentData: visitorParkingSessions,
    isLoading: isLoadingVisitorParkingSessions,
    isError: isVisitorParkingSessionsError,
    refetch: refetchVisitorParkingSessions,
  } = useVisitorParkingSessionsQuery(
    parkingAccount?.scope === ParkingPermitScope.visitor && visitorVehicleId
      ? {
          vehicle_id: visitorVehicleId,
          report_code: currentPermit.report_code.toString(),
          status,
        }
      : skipToken,
    options,
  )

  return {
    isLoading: isLoadingParkingSessions || isLoadingVisitorParkingSessions,
    isError: isParkingSessionsError || isVisitorParkingSessionsError,
    parkingSessions:
      parkingSessions?.result || visitorParkingSessions?.[status],
    page: parkingSessions?.page,
    refetch: visitorVehicleId
      ? refetchVisitorParkingSessions
      : refetchParkingSessions,
  }
}
