import {useCallback} from 'react'
import type {ParkingPermit} from '@/modules/parking/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
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

  return permits?.map(
    ({permit_name, report_code, permit_zone, permit_type}, permitIndex) => (
      <TopTaskButton
        icon={{
          isFilled: scope === ParkingPermitScope.visitor,
          name:
            scope === ParkingPermitScope.visitor
              ? 'person'
              : 'document-check-mark',
          size: 'lg',
        }}
        insetHorizontal="sm"
        key={
          scope === ParkingPermitScope.visitor
            ? `visitor-${permit_name}`
            : `holder-${permit_name}`
        }
        onPress={() => onPress(report_code.toString())}
        testID={`ParkingSelectPermit${permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
        title={
          scope === ParkingPermitScope.visitor
            ? `Op bezoek ${permit_zone.name} - ${report_code}`
            : permit_name
        }
      />
    ),
  )
}
