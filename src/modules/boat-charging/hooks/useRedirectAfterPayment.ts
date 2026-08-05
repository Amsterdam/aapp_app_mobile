import {useCallback} from 'react'
import type {BoatChargingPaymentResultStatus} from '@/modules/boat-charging/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/boat-charging/alerts'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {setLastGuestSessionId} from '@/modules/boat-charging/slice'
import {useAlert} from '@/store/slices/alert'

export const useRedirectAfterPayment = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {isLoggedIn} = useIsLoggedIn()
  const {setAlert} = useAlert()
  const {reset} = useNewSessionFormContext()

  return useCallback(
    (paymentStatus: BoatChargingPaymentResultStatus, sessionId: string) => {
      if (paymentStatus === 'paid') {
        if (!isLoggedIn) {
          dispatch(setLastGuestSessionId(sessionId))
        }

        reset()

        navigation.popTo(BoatChargingRouteName.map)
        navigation.push(BoatChargingRouteName.activeSessionDetails, {
          id: sessionId,
        })
      } else {
        navigation.goBack()
        setAlert(alerts.paymentFailed)
      }
    },
    [isLoggedIn, reset, navigation, dispatch, setAlert],
  )
}
