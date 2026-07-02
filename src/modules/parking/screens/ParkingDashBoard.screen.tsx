import {navigationRef} from '@/app/navigation/navigationRef'
import {type NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingDashboard} from '@/modules/parking/components/dashboard/ParkingDashboard'
import {ParkingDashboardBottomSheet} from '@/modules/parking/components/dashboard/bottomsheet/ParkingDashboardBottomSheet'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useHandleDeeplink} from '@/modules/parking/hooks/useHandleDeeplink'
import {useTransferReduxAccountNameToSecureStorage} from '@/modules/parking/hooks/useTransferReduxAccountNameToSecureStorage'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccountIsLoggingOut} from '@/modules/parking/slice'

type Props = NavigationProps<ParkingRouteName.dashboard>

export const ParkingDashboardScreen = ({route}: Props) => {
  useTransferReduxAccountNameToSecureStorage()

  useHandleDeeplink(route)
  const {permits, isLoading} = useGetPermits()
  const {headerShown = true} = (navigationRef.current?.getCurrentOptions() ??
    {}) as {headerShown?: boolean}
  const isLoggingOut = useParkingAccountIsLoggingOut()

  if (isLoading || isLoggingOut) {
    return (
      <Screen
        bottomSheet={!headerShown}
        hasStickyAlert
        headerOptions={{
          disableHorizontalInsets: true,
        }}
        testID="ParkingDashboardScreen">
        <PleaseWait testID="ParkingDashboardScreenPleaseWait" />
      </Screen>
    )
  }

  if (!permits) {
    return (
      <Screen
        bottomSheet={!headerShown}
        hasStickyAlert
        headerOptions={{
          disableHorizontalInsets: true,
        }}
        testID="ParkingDashboardScreen">
        <Box>
          <SomethingWentWrong testID="ParkingDashboardScreenSomethingWentWrong" />
        </Box>
      </Screen>
    )
  }

  return (
    <CurrentPermitProvider>
      <Screen
        bottomSheet={<ParkingDashboardBottomSheet />}
        hasStickyAlert
        headerOptions={{
          disableHorizontalInsets: true,
        }}
        keyboardAware
        testID="ParkingDashboardScreen">
        <BackgroundColorArea
          color="primary"
          height={320}
        />
        <Box
          insetBottom="md"
          insetHorizontal="md"
          insetTop="lg">
          <ParkingDashboard />
        </Box>
      </Screen>
    </CurrentPermitProvider>
  )
}
