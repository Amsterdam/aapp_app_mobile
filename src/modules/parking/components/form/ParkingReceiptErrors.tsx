import {useForm} from 'react-hook-form'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {alerts} from '@/modules/parking/alerts'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

type ParkingReceiptErrorsProps = {
  remainingTimeBalanceError: boolean
  remainingWalletBalanceError: boolean
}

export const ParkingReceiptErrors = ({
  remainingTimeBalanceError,
  remainingWalletBalanceError,
}: ParkingReceiptErrorsProps) => {
  const {
    formState: {errors},
  } = useForm()
  const parkingAccount = useParkingAccount()

  return (
    <>
      {(!!remainingTimeBalanceError ||
        errors.root?.serverError?.message ===
          'SSP_TIME_BALANCE_INSUFFICIENT') && (
        <AlertNegative
          {...alerts[
            parkingAccount?.scope === ParkingPermitScope.permitHolder
              ? 'insufficientTimeBalanceFailed'
              : 'insufficientTimeBalanceVisitorFailed'
          ]}
        />
      )}
      {(!!remainingWalletBalanceError ||
        errors.root?.serverError?.message === 'SSP_BALANCE_TOO_LOW') && (
        <AlertNegative {...alerts.insufficientMoneyBalanceFailed} />
      )}
      {errors.root?.serverError &&
        errors.root?.serverError?.message !== 'SSP_TIME_BALANCE_INSUFFICIENT' &&
        errors.root?.serverError?.message !== 'SSP_BALANCE_TOO_LOW' && (
          <SomethingWentWrong testID="ParkingReceiptSomethingWentWrong" />
        )}
    </>
  )
}
