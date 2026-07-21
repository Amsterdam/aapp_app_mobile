import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingInitSessionMutation,
  useBoatChargingTermsQuery,
} from '@/modules/boat-charging/service'
import {
  selectBoatChargingLoggedInUsername,
  selectLastApprovedTermsVersionWhileLoggedIn,
  useGuestSessionFormValues,
} from '@/modules/boat-charging/slice'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<{socketId: string}>()
  const {data: terms, isLoading, isError, refetch} = useBoatChargingTermsQuery()
  const [
    initSession,
    {isLoading: isInitSessionLoading, isError: isInitSessionError},
  ] = useBoatChargingInitSessionMutation()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()
  const {setSocketId} = useGuestSessionFormValues()
  const loggedInUsername = useSelector(selectBoatChargingLoggedInUsername)
  const openWebUrl = useOpenWebUrl()

  const onSubmit = useCallback(
    ({socketId}: {socketId?: string}) => {
      if (!socketId) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return
      }

      setSocketId(socketId)

      if (isLoggedIn) {
        if (!loggedInUsername) {
          return
        }

        if (terms?.version !== lastApprovedTermsVersion) {
          navigate(BoatChargingRouteName.boatChargingTermsAndConditions)

          return
        } else {
          return initSession({
            station_id: socketId,
            socket_number: 1, //TODO: get the socket number from the selected socket, not hardcoded to 1
            email: loggedInUsername,
            name: loggedInUsername,
            return_url: 'amsterdam://boat-charging',
          })
            .unwrap()
            .then(({checkout_url}) => {
              openWebUrl(checkout_url)
            })
        }
      } else {
        navigate(BoatChargingRouteName.boatChargingGuestEmail)
      }
    },
    [
      setSocketId,
      isLoggedIn,
      loggedInUsername,
      form,
      terms?.version,
      lastApprovedTermsVersion,
      navigate,
      initSession,
      openWebUrl,
    ],
  )

  if (isLoggedIn && terms?.version === lastApprovedTermsVersion) {
    return (
      <Button
        disabled={isLoading || isInitSessionLoading}
        icon={{name: 'boat-charging-free', color: 'inverse'}}
        isError={isError || isInitSessionError}
        isLoading={isLoading || isInitSessionLoading}
        label="Betalen en laden"
        marginTop="auto"
        onPress={isError ? refetch : form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    )
  }

  return (
    <Button
      disabled={!!isLoggedIn && (isLoading || isError)}
      isError={!!isLoggedIn && (isError || isInitSessionError)}
      isLoading={!!isLoggedIn && (isLoading || isInitSessionLoading)}
      label="Verder met opladen"
      marginTop="auto"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingDetailsChooseSocketSubmitButton"
    />
  )
}
