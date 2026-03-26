import {useCallback} from 'react'
import type {ParkingPermit} from '@/modules/parking/types'
import {ParkingPermitSelectButton} from '@/modules/parking/components/select-permit/ParkingPermitSelectButton'
import {useSwitchPermit} from '@/modules/parking/hooks/useSwitchPermit'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  accountIndex: number
  parkingAccountReportCode: string
  permits?: ParkingPermit[]
  scope: ParkingPermitScope
}

export const ParkingSelectPermitList = ({
  scope,
  permits,
  accountIndex,
  parkingAccountReportCode,
}: Props) => {
  const {close} = useBottomSheet()

  const switchPermit = useSwitchPermit()
  const onPress = useCallback(
    (reportCode: string) => {
      switchPermit(parkingAccountReportCode, reportCode)

      close()
    },
    [close, switchPermit, parkingAccountReportCode],
  )

  return permits?.map(
    ({report_code, permit_name, permit_type}, permitIndex) => (
      <ParkingPermitSelectButton
        accountReportCode={parkingAccountReportCode}
        key={`${scope}-${report_code}`}
        onPress={onPress}
        permitName={permit_name}
        permitReportCode={report_code}
        permitScope={scope}
        testID={`ParkingSelectPermit${permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
      />
    ),
  )
}
