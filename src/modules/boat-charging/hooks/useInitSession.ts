import {useCallback} from 'react'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useStore} from '@/hooks/redux/useStore'
import {alerts} from '@/modules/boat-charging/alerts'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingInitSessionMutation,
} from '@/modules/boat-charging/service'
import {
  selectBoatChargingLoggedInUsername,
  selectLastApprovedTermsVersionWhileLoggedIn,
} from '@/modules/boat-charging/slice'
import {useAlert} from '@/store/slices/alert'
import {validateEmail} from '@/utils/validate'

export enum BoatChargingInitSessionStep {
  guestEmail = 2,
  guestEmailConfirm = 3,
  selectSocket = 1,
  termsAndConditions = 4,
}

export const useInitSession = (step: BoatChargingInitSessionStep) => {
  const form = useNewSessionFormContext()

  const {data: terms, isLoading, isError, refetch} = useBoatChargingTermsQuery()
  const [
    initSession,
    {isLoading: isInitSessionLoading, isError: isInitSessionError},
  ] = useBoatChargingInitSessionMutation()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const {isLoggedIn} = useIsLoggedIn()
  const navigation = useNavigation()
  const {navigate} = navigation
  const loggedInUsername = useSelector(selectBoatChargingLoggedInUsername)
  const openWebUrl = useOpenWebUrl()
  const store = useStore()
  const {setAlert} = useAlert()

  const onPress = useCallback(
    (params: NewSessionFormValues) => {
      const state = store.getState()
      let email = params.email
      const {selectedSocket, approvedTerms, didVerifyEmail} = params
      const {socketNumber, stationId} = selectedSocket || {}
      const lastApprovedTermsVersionFromState =
        selectLastApprovedTermsVersionWhileLoggedIn(state)

      if (!socketNumber || !stationId) {
        navigation.replace(BoatChargingRouteName.map)

        return Promise.resolve()
      }

      if (isLoggedIn) {
        if (!loggedInUsername) {
          return Promise.resolve()
        }

        email = loggedInUsername

        if (terms?.version !== lastApprovedTermsVersionFromState) {
          navigate(BoatChargingRouteName.termsAndConditions)

          return Promise.resolve()
        }
      } else {
        if (
          !email ||
          validateEmail(email) !== true ||
          step === BoatChargingInitSessionStep.selectSocket
        ) {
          navigate(BoatChargingRouteName.guestEmail)

          return Promise.resolve()
        }

        if (
          !didVerifyEmail ||
          step === BoatChargingInitSessionStep.guestEmail
        ) {
          navigate(BoatChargingRouteName.guestEmailConfirm)

          return Promise.resolve()
        }

        if (
          !approvedTerms ||
          step === BoatChargingInitSessionStep.guestEmailConfirm
        ) {
          navigate(BoatChargingRouteName.termsAndConditions)

          return Promise.resolve()
        }
      }

      return initSession({
        station_id: stationId,
        socket_number: socketNumber,
        email,
        name: email,
        return_url: 'amsterdam://boat-charging/payment',
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
      initSession,
      isLoggedIn,
      loggedInUsername,
      navigate,
      navigation,
      openWebUrl,
      setAlert,
      step,
      store,
      terms?.version,
    ],
  )

  return {
    onPress,
    mustApproveTerms:
      !isLoggedIn || terms?.version !== lastApprovedTermsVersion,
    disabled: isLoading || isInitSessionLoading,
    isLoading: isLoading || isInitSessionLoading,
    isError: isError || isInitSessionError,
    refetch,
    form,
    shouldRefetchTerms: isError,
  }
}
