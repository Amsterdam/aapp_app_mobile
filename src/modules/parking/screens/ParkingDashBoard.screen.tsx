import {navigationRef} from '@/app/navigation/navigationRef'
import {type NavigationProps} from '@/app/navigation/types'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Placement} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {DashboardHeaderButton} from '@/modules/parking/components/DashboardHeaderButton'
import {DashboardMenu} from '@/modules/parking/components/DashboardMenu'
import {ParkingInfoSection} from '@/modules/parking/components/ParkingInfoSection'
import {ParkingPermitTopTaskButton} from '@/modules/parking/components/ParkingPermitTopTaskButton'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/dashboard/ParkingDashboardNavigationButtons'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/dashboard/ParkingPaymentByVisitorButton'
import {ParkingPermitBalance} from '@/modules/parking/components/dashboard/ParkingPermitBalance'
import {ParkingPermitSessions} from '@/modules/parking/components/dashboard/ParkingPermitSessions'
import {ParkingStartSessionButton} from '@/modules/parking/components/dashboard/ParkingStartSessionButton'
import {ParkingDashboardBottomSheet} from '@/modules/parking/components/dashboard/bottomsheet/ParkingDashboardBottomSheet'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useHandleDeeplink} from '@/modules/parking/hooks/useHandleDeeplink'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  setIsLoggingIn,
  useParkingAccountIsLoggingOut,
} from '@/modules/parking/slice'

type Props = NavigationProps<ParkingRouteName.dashboard>

export const ParkingDashboardScreen = ({route}: Props) => {
  const dispatch = useDispatch()

  useHandleDeeplink(route)
  const {permits, isLoading} = useGetPermits()
  const {headerShown = true} = (navigationRef.current?.getCurrentOptions() ??
    {}) as {headerShown?: boolean}
  const isLoggingOut = useParkingAccountIsLoggingOut()

  useFocusAndForegroundEffect(() => {
    dispatch(setIsLoggingIn(false))
  }, [])

  if (isLoading || isLoggingOut) {
    return (
      <Screen
        bottomSheet={!headerShown}
        hasStickyAlert
        headerOptions={{
          disableHorizontalInsets: true,
          SideComponent: DashboardHeaderButton,
        }}
        stickyHeader={<DashboardMenu />}
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
          SideComponent: DashboardHeaderButton,
        }}
        stickyHeader={<DashboardMenu />}
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
          SideComponent: DashboardHeaderButton,
        }}
        keyboardAware
        stickyHeader={<DashboardMenu />}
        testID="ParkingDashboardScreen">
        <BackgroundColorArea
          color="primary"
          height={240}
        />
        <Box
          insetBottom="md"
          insetHorizontal="md"
          insetTop="lg">
          <Column gutter="lg">
            <ProductTourTipWrapper
              placement={Placement.below}
              testID="ParkingPermitTopTaskButtonTooltip"
              tipSlug={Tip.parkingPermitTopTaskButtonTooltip}>
              <ParkingPermitTopTaskButton />
            </ProductTourTipWrapper>
            <Column gutter="xl">
              <ParkingPermitSessions />
              <Column gutter="md">
                <ParkingStartSessionButton />
                <ParkingPaymentByVisitorButton />
              </Column>
              <ParkingDashboardNavigationButtons />
              <ParkingPermitBalance />
            </Column>
            <ParkingInfoSection />
          </Column>
        </Box>
      </Screen>
    </CurrentPermitProvider>
  )
}
