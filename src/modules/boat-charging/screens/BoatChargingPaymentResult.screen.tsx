import {useEffect} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useRedirectAfterPayment} from '@/modules/boat-charging/hooks/useRedirectAfterPayment'

type Props = NavigationProps<BoatChargingRouteName.paymentResult>

export const BoatChargingPaymentResultScreen = ({route}: Props) => {
  const {params} = route
  const redirect = useRedirectAfterPayment(true)

  useEffect(() => {
    const {paymentStatus, sessionId} = params ?? {}

    if (typeof paymentStatus !== 'string' || typeof sessionId !== 'string') {
      redirect('unpaid', '')

      return
    }

    redirect(paymentStatus, sessionId)
  }, [params, redirect])

  return null
}
