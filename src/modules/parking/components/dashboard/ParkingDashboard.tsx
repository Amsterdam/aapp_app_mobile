import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {Column} from '@/components/ui/layout/Column'
import {Placement} from '@/components/ui/types'
import {ParkingInfoSection} from '@/modules/parking/components/ParkingInfoSection'
import {ParkingPermitSwitcher} from '@/modules/parking/components/ParkingPermitSwitcher'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/dashboard/ParkingDashboardNavigationButtons'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/dashboard/ParkingPaymentByVisitorButton'
import {ParkingPermitBalance} from '@/modules/parking/components/dashboard/ParkingPermitBalance'
import {ParkingPermitSessions} from '@/modules/parking/components/dashboard/ParkingPermitSessions'
import {ParkingStartSessionButton} from '@/modules/parking/components/dashboard/ParkingStartSessionButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingDashboard = () => {
  const currentPermit = useCurrentParkingPermit()

  return (
    <Column gutter="lg">
      <ProductTourTipWrapper
        placement={Placement.below}
        testID="ParkingPermitTopTaskButtonTooltip"
        tipSlug={Tip.parkingPermitTopTaskButtonTooltip}>
        <ParkingPermitSwitcher />
      </ProductTourTipWrapper>

      <Column gutter="xl">
        <ParkingPermitSessions />

        {!currentPermit.isPermitStartedAtInFuture && (
          <Column gutter="md">
            <ParkingStartSessionButton />
            <ParkingPaymentByVisitorButton />
          </Column>
        )}

        <ParkingDashboardNavigationButtons />
        <ParkingPermitBalance />
      </Column>

      <ParkingInfoSection />
    </Column>
  )
}
