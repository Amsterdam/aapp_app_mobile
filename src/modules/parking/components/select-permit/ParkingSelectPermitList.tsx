import {useCallback} from 'react'
import type {ParkingPermit} from '@/modules/parking/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ParkingPermitSelectButton} from '@/modules/parking/components/select-permit/ParkingPermitSelectButton'
import {useSwitchPermit} from '@/modules/parking/hooks/useSwitchPermit'
import {ParkingPermitScope} from '@/modules/parking/types'

type Props = {
  accountIndex: number
  permits?: ParkingPermit[]
  reportCodeParkingAccount: string
  scope: ParkingPermitScope
}

export const ParkingSelectPermitList = ({
  scope,
  permits,
  accountIndex,
  reportCodeParkingAccount,
}: Props) => {
  const {close} = useBottomSheet()

  const switchPermit = useSwitchPermit()
  const onPress = useCallback(
    (reportCode: string) => {
      switchPermit(reportCodeParkingAccount, reportCode)

      close()
    },
    [close, switchPermit, reportCodeParkingAccount],
  )

  return permits?.map((permit, permitIndex) => (
    <ParkingPermitSelectButton
      accountReportCode={reportCodeParkingAccount}
      key={`${scope}-${permit.report_code}`}
      onPress={onPress}
      permitName={permit.permit_name}
      permitReportCode={permit.report_code}
      permitScope={scope}
      testID={`ParkingSelectPermit${permit.permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
    />
  ))
}
