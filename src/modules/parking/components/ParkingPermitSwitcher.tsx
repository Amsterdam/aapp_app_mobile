import {useContext} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {ContextSwitchButton} from '@/components/ui/buttons/ContextSwitchButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitSwitcher = () => {
  const {toggle} = useContext(BottomSheetContext)
  const parkingAccount = useParkingAccount()
  const {permit_name, report_code} = useCurrentParkingPermit()
  const {secureAccount} = useGetSecureParkingAccount(
    parkingAccount?.scope ?? ParkingPermitScope.visitor,
    parkingAccount?.reportCode,
  )

  if (!report_code) {
    return (
      <SomethingWentWrong testID="ParkingPermitSwitcherSomethingWentWrong" />
    )
  }

  const title =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? 'Op bezoek'
      : permit_name

  return (
    <Box variant="distinct">
      <Column
        gutter="md"
        halign="start">
        <Column gutter="xs">
          <Title
            level="h4"
            testID="ParkingPermitSwitcherTitle"
            text={title}
          />
          <Phrase>
            {secureAccount?.name && `${secureAccount?.name} - `}
            {report_code}
          </Phrase>
        </Column>
        <ContextSwitchButton
          accessibilityHint="Tik om een andere vergunning te selecteren."
          accessibilityLabel={`De huidige vergunning is ${title}.`}
          label="Kies een andere vergunning"
          noPadding
          onPress={() =>
            toggle(ParkingDashboardBottomSheetVariant.selectPermit)
          }
          testID="ParkingPermitContextSwitchButton"
        />
      </Column>
    </Box>
  )
}
