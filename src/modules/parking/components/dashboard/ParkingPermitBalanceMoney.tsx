import {useEffect} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {ParkingAddMoneyButton} from '@/modules/parking/components/ParkingAddMoneyButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {
  setWalletBalanceIncreaseStartedAt,
  useWalletBalanceIncreaseStartedAt,
  useWalletBalanceIncreaseStartBalance,
} from '@/modules/parking/slice'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingPermitBalanceMoney = () => {
  const dispatch = useDispatch()
  const currentPermit = useCurrentParkingPermit()
  const walletBalance = useWalletBalanceIncreaseStartBalance()
  const {data: account, isLoading, refetch} = useAccountDetailsQuery()
  const accountWalletBalance = account?.wallet?.balance
  const walletBalanceIncreaseStartedAt = useWalletBalanceIncreaseStartedAt()

  useEffect(() => {
    if (
      walletBalance &&
      accountWalletBalance &&
      accountWalletBalance > walletBalance
    ) {
      dispatch(setWalletBalanceIncreaseStartedAt(undefined))
    }
  }, [dispatch, walletBalance, accountWalletBalance])

  // refetch account details every 5 seconds if the wallet balance hasn't updated yet, it can take a bit before the payment is processed
  useRefetchInterval(
    refetch,
    walletBalanceIncreaseStartedAt &&
      dayjs().diff(walletBalanceIncreaseStartedAt, 'minutes') < 15 &&
      typeof walletBalance === 'number' &&
      walletBalance === accountWalletBalance
      ? 5000
      : 0,
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceMoneyPleaseWait" />
  }

  if (!account) {
    return (
      <SomethingWentWrong testID="ParkingPermitBalanceMoneySomethingWentWrong" />
    )
  }

  if (!currentPermit.money_balance_applicable || !account.wallet) {
    return null
  }

  const {
    wallet: {balance, currency},
  } = account

  return (
    <Column gutter="md">
      <SingleSelectable>
        <Column gutter="xs">
          <Row align="between">
            <Title
              level="h5"
              testID="ParkingPermitBalanceMoneyTitlePhrase"
              text="Geldsaldo"
            />
            <Title
              level="h5"
              testID="ParkingPermitBalanceMoneyTitlePhrase"
              text={balance ? formatNumber(balance, currency) : 'Onbekend'}
            />
          </Row>
        </Column>
      </SingleSelectable>
      <ParkingAddMoneyButton variant="secondary" />
    </Column>
  )
}
