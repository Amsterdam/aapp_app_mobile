import {skipToken} from '@reduxjs/toolkit/query'
import {Dayjs} from 'dayjs'
import {useMemo} from 'react'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useAccountDetailsQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {getRemainingTimeBalance} from '@/modules/parking/utils/getRemainingTimeBalance'

export const useGetRemainingBalance = (
  startTime?: Dayjs,
  endTime?: Dayjs,
  originalEndTime?: Dayjs,
  parkingMachineId?: string,
  cost?: number,
) => {
  const currentPermit = useCurrentParkingPermit()
  const {data: parkingAccount} = useAccountDetailsQuery()
  const {data: parkingMachine} = useZoneByMachineQuery(
    parkingMachineId
      ? {machineId: parkingMachineId, report_code: currentPermit?.report_code}
      : skipToken,
  )

  const remainingTimeBalance = useMemo(() => {
    if (originalEndTime) {
      return (
        (getRemainingTimeBalance(
          currentPermit.time_balance,
          startTime,
          endTime,
          parkingMachine,
          currentPermit.can_select_zone,
        ) ?? 0) -
        (getRemainingTimeBalance(
          0,
          startTime,
          originalEndTime,
          parkingMachine,
          currentPermit.can_select_zone,
        ) ?? 0)
      )
    } else {
      return getRemainingTimeBalance(
        currentPermit.time_balance,
        startTime,
        endTime,
        parkingMachine,
        currentPermit.can_select_zone,
      )
    }
  }, [
    currentPermit.can_select_zone,
    currentPermit.time_balance,
    endTime,
    originalEndTime,
    parkingMachine,
    startTime,
  ])

  const remainingWalletBalance = useMemo(
    () =>
      cost && typeof parkingAccount?.wallet?.balance === 'number'
        ? parkingAccount?.wallet?.balance - cost
        : parkingAccount?.wallet?.balance,
    [cost, parkingAccount?.wallet?.balance],
  )

  return {remainingTimeBalance, remainingWalletBalance}
}
