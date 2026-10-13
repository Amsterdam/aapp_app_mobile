import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

const ROOT_LOCAL_ERROR_KEY = 'root.localError'

export const useRemainingWalletBalanceError = (
  remainingWalletBalance?: number,
) => {
  const parkingAccount = useParkingAccount()
  const currentPermit = useCurrentParkingPermit()
  const {data: accountData} = useAccountDetailsQuery()

  const {
    clearErrors,
    setError,
    formState: {errors},
  } = useFormContext()

  const remainingWalletBalanceError =
    parkingAccount?.scope === ParkingPermitScope.permitHolder &&
    currentPermit.money_balance_applicable &&
    typeof remainingWalletBalance === 'number' &&
    accountData?.wallet?.balance !== 0 &&
    remainingWalletBalance < 0

  useEffect(() => {
    if (remainingWalletBalanceError) {
      setError(ROOT_LOCAL_ERROR_KEY, {
        type: 'isWalletBalanceInsufficient',
      })
    } else if (
      errors.root?.localError?.type === 'isWalletBalanceInsufficient'
    ) {
      clearErrors(ROOT_LOCAL_ERROR_KEY)
    }
  }, [
    clearErrors,
    errors.root?.localError?.type,
    remainingWalletBalanceError,
    setError,
  ])

  return (
    parkingAccount?.scope === ParkingPermitScope.permitHolder &&
    currentPermit.money_balance_applicable &&
    typeof remainingWalletBalance === 'number' &&
    accountData?.wallet?.balance !== 0 &&
    remainingWalletBalance < 0
  )
}
