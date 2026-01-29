import {useCallback} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {AdditionalLoginButton} from '@/modules/parking/components/login/AdditionalLoginButton'
import {useSwitchPermit} from '@/modules/parking/hooks/useSwitchPermit'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {isEmptyObject} from '@/utils/object'

export const ParkingSelectPermit = () => {
  const {close} = useBottomSheet()
  const focusRef = useSetBottomSheetElementFocus()
  const switchPermit = useSwitchPermit()
  const parkingAccounts = useParkingAccounts()

  const onPress = useCallback(
    (reportCodeParkingAccount: string, reportCode: string) => {
      switchPermit(reportCodeParkingAccount, reportCode)

      close()
    },
    [close, switchPermit],
  )

  if (isEmptyObject(parkingAccounts)) {
    return <SomethingWentWrong testID="ParkingSelectPermitSomethingWentWrong" />
  }

  return (
    <Box grow>
      <Column gutter="lg">
        <Column gutter="sm">
          {Object.values(parkingAccounts).some(
            acc => acc.scope === ParkingPermitScope.permitHolder,
          ) && (
            <Title
              level="h4"
              ref={focusRef}
              testID="ParkingSelectPermitTitle"
              text="Mijn vergunningen"
            />
          )}
          {Object.entries(parkingAccounts)
            .sort(([, a], [, _b]) =>
              a.scope === ParkingPermitScope.permitHolder ? -1 : 1,
            )
            .map(([reportCodeParkingAccount, account], accountIndex) => (
              <Column
                gutter="no"
                key={`ParkingSelectPermitTitle-${accountIndex}`}>
                {((account.scope === ParkingPermitScope.permitHolder &&
                  !!account.name) ||
                  account.scope === ParkingPermitScope.visitor) && (
                  <Title
                    level="h4"
                    ref={focusRef}
                    testID="ParkingSelectPermitTitle"
                    text={
                      account.scope === ParkingPermitScope.visitor
                        ? 'Bezoekersaccount'
                        : (account.name ?? '')
                    }
                  />
                )}
                {account.permits?.map(
                  (
                    {permit_name, report_code, permit_zone, permit_type},
                    permitIndex,
                  ) => (
                    <TopTaskButton
                      icon={{
                        isFilled: account.scope === ParkingPermitScope.visitor,
                        name:
                          account.scope === ParkingPermitScope.visitor
                            ? 'person'
                            : 'document-check-mark',
                        size: 'lg',
                      }}
                      insetHorizontal="sm"
                      key={
                        account.scope === ParkingPermitScope.visitor
                          ? `visitor-${permit_name}`
                          : `holder-${permit_name}`
                      }
                      onPress={() =>
                        onPress(
                          reportCodeParkingAccount,
                          report_code.toString(),
                        )
                      }
                      testID={`ParkingSelectPermit${permit_type}-${accountIndex}-${permitIndex}TopTaskButton`}
                      title={
                        account.scope === ParkingPermitScope.visitor
                          ? `Op bezoek ${permit_zone.name} - ${report_code}`
                          : permit_name
                      }
                    />
                  ),
                )}
              </Column>
            ))}
        </Column>
        <AdditionalLoginButton testID="ParkingSelectPermitLoginTopTaskButton" />
      </Column>
    </Box>
  )
}
