import {useCallback} from 'react'
import type {ParkingPermit} from '@/modules/parking/types'
import {ParkingSelectPermitListItem} from '@/modules/parking/components/select-permit/ParkingSelectPermitListItem'
import {useSwitchPermit} from '@/modules/parking/hooks/useSwitchPermit'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

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
    <ParkingSelectPermitListItem
      key={
        scope === ParkingPermitScope.visitor
          ? `visitor-${permit.permit_name}`
          : `holder-${permit.permit_name}`
      }
      onPress={onPress}
      permitItem={{...permit, scope}}
      testID={`ParkingSelectPermit${permit.permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
    />
  ))
}
