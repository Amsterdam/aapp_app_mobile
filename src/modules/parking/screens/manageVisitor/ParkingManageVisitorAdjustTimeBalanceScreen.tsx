import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {ManageVisitorChooseTimeAddOn} from '@/modules/parking/components/manageVisitor/ManageVisitorChooseTimeAddOn'
import {ManageVisitorTimeAddOnBottomSheet} from '@/modules/parking/components/manageVisitor/ManageVisitorTimeAddOnBottomSheet'
import {ManageVisitorTimeBalance} from '@/modules/parking/components/manageVisitor/ManageVisitorTimeBalance'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ManageVisitorIncreaseTimeBalanceFormProvider} from '@/modules/parking/providers/ManageVisitorIncreaseTimeBalanceFormProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.manageVisitorAdjustTimeBalance>

export const ParkingManageVisitorAdjustTimeBalanceScreen = ({route}: Props) => {
  const {params} = route ?? {}

  useSetScreenTitle(`Tijd ${params?.subtractTime ? 'aftrekken' : 'toevoegen'}`)

  return (
    <CurrentPermitProvider>
      <ManageVisitorIncreaseTimeBalanceFormProvider>
        <Screen
          bottomSheet={
            <ManageVisitorTimeAddOnBottomSheet
              isNegative={params?.subtractTime}
            />
          }
          hasStickyAlert
          testID="ParkingManageVisitorAdjustTimeBalanceScreen">
          <Box>
            <Column gutter="xl">
              <ManageVisitorChooseTimeAddOn isNegative={params?.subtractTime} />
              <Column gutter="md">
                <Title
                  level="h2"
                  text="Tijdsaldo"
                />
                <ManageVisitorTimeBalance isNegative={params?.subtractTime} />
              </Column>
            </Column>
          </Box>
        </Screen>
      </ManageVisitorIncreaseTimeBalanceFormProvider>
    </CurrentPermitProvider>
  )
}
