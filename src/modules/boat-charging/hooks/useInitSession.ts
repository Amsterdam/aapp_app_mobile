import {useCallback} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useStore} from '@/hooks/redux/useStore'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingTermsQuery,
  useBoatChargingInitSessionMutation,
} from '@/modules/boat-charging/service'
import {
  selectBoatChargingLoggedInUsername,
  selectLastApprovedTermsVersionWhileLoggedIn,
} from '@/modules/boat-charging/slice'

export const useInitSession = () => {
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

  const onPress = useCallback(() => {
    const state = store.getState()
    let {email} = state.boatCharging.newSessionFormValues || {}
    const {socketNumber, stationId, approvedTerms, didVerifyEmail} =
      state.boatCharging.newSessionFormValues || {}
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
      if (!email) {
        navigate(BoatChargingRouteName.guestEmail)

        return Promise.resolve()
      }

      if (!didVerifyEmail) {
        navigate(BoatChargingRouteName.guestEmailConfirm)

        return Promise.resolve()
      }

      if (!approvedTerms) {
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
      .then(({checkout_url}) => {
        openWebUrl(checkout_url)
      })
  }, [
    initSession,
    isLoggedIn,
    loggedInUsername,
    navigate,
    navigation,
    openWebUrl,
    store,
    terms?.version,
  ])

  return {
    onPress,
    mustApproveTerms:
      !isLoggedIn || terms?.version !== lastApprovedTermsVersion,
    disabled: isLoading || isInitSessionLoading,
    isLoading: isLoading || isInitSessionLoading,
    isError: isError || isInitSessionError,
    refetch,
  }
}
