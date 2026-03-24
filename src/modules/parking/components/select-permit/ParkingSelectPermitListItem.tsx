import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import type {ParkingPermit} from '@/modules/parking/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingAccount, useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingSelectPermitListItem = ({
  permitItem,
  testID,
  onPress,
}: {
  onPress: (reportCode: string) => void
  permitItem: ParkingPermit & {scope: ParkingPermitScope}
} & TestProps) => {
  const {
    permit_name,
    report_code: permitItemReportCode,
    scope: permitItemScope,
  } = permitItem
  const {report_code: currentPermitReportCode} = useCurrentParkingPermit()
  const {scope: currentAccountScope} = useParkingAccount() ?? {}
  const accounts = useParkingAccounts()

  const associatedAccount = useMemo(
    () =>
      Object.values(accounts).find(
        ({permits: accountPermits, scope: accountScope}) =>
          accountPermits?.some(
            permit => permit.report_code === permitItem.report_code,
          ) && accountScope === permitItemScope,
      ),
    [permitItemScope, permitItem, accounts],
  )

  const {secureAccount} = useGetSecureParkingAccount(
    permitItemScope,
    associatedAccount?.reportCode,
  )
  const {name} = secureAccount ?? {}

  const props = useMemo(
    () =>
      permitItemScope === ParkingPermitScope.visitor
        ? {
            title: name ?? associatedAccount?.reportCode,
            text: name ? associatedAccount?.reportCode : undefined,
          }
        : {
            title: permit_name,
            text: [name, associatedAccount?.reportCode]
              .filter(Boolean)
              .join(' - '),
          },
    [name, associatedAccount, permit_name, permitItemScope],
  )

  const isCurrent =
    currentPermitReportCode === permitItemReportCode &&
    currentAccountScope === permitItemScope

  return (
    <TopTaskButton
      gutter="sm"
      icon={{
        size: 'ml',
        name: isCurrent ? 'check-mark-bold' : 'empty',
      }}
      insetHorizontal="no"
      onPress={() => onPress(permitItemReportCode.toString())}
      testID={testID}
      {...props}
    />
  )
}
