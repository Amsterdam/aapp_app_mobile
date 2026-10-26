import {useCallback} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/boat-charging/alerts'
import {useInitSessionNextStep} from '@/modules/boat-charging/hooks/useInitSessionNextStep'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingInitSessionMutation,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import {
  selectBoatChargingLoggedInUsername,
  selectLastApprovedTermsVersionWhileLoggedIn,
} from '@/modules/boat-charging/slice'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

export enum BoatChargingInitSessionStep {
  guestEmail = 2,
  verifyVignet = 3,
  chooseVignet = 4,
  selectSocket = 1,
  termsAndConditions = 5,
  confirmSession = 6,
}

export const useInitSession = (step: BoatChargingInitSessionStep) => {
  const form = useNewSessionFormContext()
  const {isLoggedIn} = useIsLoggedIn()
  const {
    data: terms,
    isLoading: isLoadingTerms,
    isError: isErrorTerms,
    refetch,
  } = useBoatChargingTermsQuery()
  const {isLoading: isLoadingVignettes, isError: isErrorVignettes} =
    useBoatChargingVignettesQuery(undefined, {
      skip: !isLoggedIn,
    })
  const [
    initSession,
    {isLoading: isInitSessionLoading, isError: isInitSessionError},
  ] = useBoatChargingInitSessionMutation()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const navigation = useNavigation()
  const loggedInUsername = useSelector(selectBoatChargingLoggedInUsername)
  const openWebUrl = useOpenWebUrl()
  const {setAlert} = useAlert()
  const getNextStep = useInitSessionNextStep(step)

  const onPress = useCallback(
    (params: NewSessionFormValues) => {
      const email = isLoggedIn ? loggedInUsername : params.email
      const {socketNumber, stationId} = params.selectedSocket || {}

      if (!socketNumber || !stationId) {
        navigation.replace(BoatChargingRouteName.map)

        return Promise.resolve()
      }

      const nextStep = getNextStep(params)

      if (nextStep) {
        navigation.navigate(nextStep)

        return Promise.resolve()
      }

      if (!email) {
        devError('No email set to init session.')

        return Promise.resolve()
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
    mustApproveTerms:
      !isLoggedIn || terms?.version !== lastApprovedTermsVersion,
    disabled: isLoadingTerms || isLoadingVignettes || isInitSessionLoading,
    isLoading: isLoadingTerms || isLoadingVignettes || isInitSessionLoading,
    isError: isErrorTerms || isErrorVignettes || isInitSessionError,
    refetch,
    form,
    shouldRefetchTerms: isErrorTerms,
  }
}
