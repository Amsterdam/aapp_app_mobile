import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

const ROOT_LOCAL_ERROR_KEY = 'root.localError'

export const useRemainingTimeBalanceError = (remainingTimeBalance?: number) => {
  const currentPermit = useCurrentParkingPermit()

  const {
    clearErrors,
    setError,
    formState: {errors},
  } = useFormContext()

  const remainingTimeBalanceError =
    currentPermit.time_balance_applicable &&
    remainingTimeBalance &&
    remainingTimeBalance < 0

  useEffect(() => {
    if (remainingTimeBalanceError) {
      setError(ROOT_LOCAL_ERROR_KEY, {
        type: 'isTimeBalanceInsufficient',
      })
    } else if (errors.root?.localError?.type === 'isTimeBalanceInsufficient') {
      clearErrors(ROOT_LOCAL_ERROR_KEY)
    }
  }, [
    clearErrors,
    errors.root?.localError?.type,
    remainingTimeBalanceError,
    setError,
  ])

  return (
    currentPermit.time_balance_applicable &&
    !!remainingTimeBalance &&
    remainingTimeBalance < 0
  )
}
