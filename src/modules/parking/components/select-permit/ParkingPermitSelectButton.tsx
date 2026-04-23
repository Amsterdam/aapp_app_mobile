import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import type {ParkingAccount, ParkingPermit} from '@/modules/parking/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

type Props = {
  accountReportCode: ParkingAccount['reportCode']
  onPress: (reportCode: string) => void
  permitName: ParkingPermit['permit_name']
  permitReportCode: ParkingPermit['report_code']
  permitScope: ParkingPermitScope
} & TestProps

export const ParkingPermitSelectButton = ({
  accountReportCode,
  permitReportCode,
  permitScope,
  permitName,
  testID,
  onPress,
}: Props) => {
  const {report_code: currentPermitReportCode} = useCurrentParkingPermit()
  const {scope: currentAccountScope} = useParkingAccount() ?? {}

  const {secureAccount} = useGetSecureParkingAccount(
    permitScope,
    accountReportCode,
  )
  const {name} = secureAccount ?? {}

  const props = useMemo(
    () =>
      permitScope === ParkingPermitScope.visitor
        ? {
            title: name ?? accountReportCode,
            text: name ? accountReportCode : undefined,
          }
        : {
            title: permitName,
            text: [name, accountReportCode].filter(Boolean).join(' - '),
          },
    [name, accountReportCode, permitName, permitScope],
  )

  const isCurrent =
    currentPermitReportCode === permitReportCode &&
    currentAccountScope === permitScope

  const getAccessibilityLabel = useMemo(
    () =>
      [
        permitScope === ParkingPermitScope.visitor ? false : permitName,
        name ? `van ${name}` : false,
        `meldcode ${accountReportCode}`,
        isCurrent ? 'geselecteerd' : false,
      ]
        .filter(Boolean)
        .join(', '),
    [name, accountReportCode, permitName, permitScope, isCurrent],
  )

  return (
    <TopTaskButton
      accessibilityLabel={getAccessibilityLabel}
      gutter="sm"
      icon={{
        size: 'ml',
        name: isCurrent ? 'check-mark-bold' : 'empty',
      }}
      insetHorizontal="no"
      onPress={() => onPress(permitReportCode)}
      testID={testID}
      {...props}
    />
  )
}
