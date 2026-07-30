import {useCallback} from 'react'
import type {BoatChargingPaymentResultStatus} from '@/modules/boat-charging/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/boat-charging/alerts'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {setLastGuestSessionId} from '@/modules/boat-charging/slice'
import {useAlert} from '@/store/slices/alert'

export const useRedirectAfterPayment = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {isLoggedIn} = useIsLoggedIn()
  const {setAlert} = useAlert()

  return useCallback(
    (paymentStatus: BoatChargingPaymentResultStatus, sessionId: string) => {
      if (paymentStatus === 'paid') {
        if (!isLoggedIn) {
          dispatch(setLastGuestSessionId(sessionId))
        }

        navigation.replace(BoatChargingRouteName.activeSessionDetails, {
          id: sessionId,
        })
      } else {
        navigation.goBack()
        setAlert(alerts.paymentFailed)
      }
    },
    [isLoggedIn, dispatch, navigation, setAlert],
  )
}
