import {useCallback} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/boat-charging/alerts'
import {useInitSessionNextStep} from '@/modules/boat-charging/hooks/useInitSessionNextStep'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingInitSessionMutation} from '@/modules/boat-charging/service'
import type {
  BoatChargingInitSessionStep,
  NewSessionFormValues,
} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

export const useInitSession = (step: BoatChargingInitSessionStep) => {
  const form = useNewSessionFormContext()
  const navigation = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const {setAlert} = useAlert()
  const {isLoggedIn, username: loggedInUsername} = useIsLoggedIn()
  const {getNextStep, isError, isLoading} = useInitSessionNextStep(step)

  const [
    initSession,
    {isLoading: isInitSessionLoading, isError: isInitSessionError},
  ] = useBoatChargingInitSessionMutation()

  const onPress = useCallback(
    (params: NewSessionFormValues) => {
      const {vignette, selectedSocket} = params
      const email = isLoggedIn ? loggedInUsername : params.email
      const {socketNumber, stationId} = selectedSocket || {}

      const nextStep = getNextStep(params)

      if (nextStep) {
        // @ts-expect-error nextStep is a valid navigation input but hard for TS to resolve
        navigation.navigate(nextStep)

        return Promise.resolve()
      }

      if (!email || !socketNumber || !stationId || !vignette) {
        devError('Missing params in session initialization request', {
          email,
          socketNumber,
          stationId,
          vignette,
        })

        navigation.replace(BoatChargingRouteName.map)

        return Promise.resolve()
      }

      return initSession({
        station_id: stationId,
        socket_number: socketNumber,
        email,
        name: email,
        return_url: 'amsterdam://boat-charging/payment',
        ...('id' in vignette && vignette.id
          ? {vignette_id: vignette.id}
          : {
              vignette_number: vignette.vignette_number,
              postal_code: vignette.postal_code,
            }),
      })
        .unwrap()
        .then(
          ({checkout_url}) => {
            openWebUrl(checkout_url)
          },
          () => {
            setAlert(alerts.initializeFailed)
          },
        )
    },
    [
      isLoggedIn,
      loggedInUsername,
      initSession,
      navigation,
      getNextStep,
      openWebUrl,
      setAlert,
    ],
  )

  return {
    onPress,
    disabled: isLoading || isInitSessionLoading,
    isLoading: isLoading || isInitSessionLoading,
    isError: isError || isInitSessionError,
    form,
  }
}
