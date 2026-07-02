import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingTermsQuery} from '@/modules/boat-charging/service'
import {
  selectLastApprovedTermsVersionWhileLoggedIn,
  useGuestSessionFormValues,
} from '@/modules/boat-charging/slice'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<{socketId: string}>()
  const {data: terms, isLoading, isError} = useBoatChargingTermsQuery()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()
  const {setSocketId} = useGuestSessionFormValues()

  const onSubmit = useCallback(
    ({socketId}: {socketId?: string}) => {
      if (!socketId) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return
      }

      setSocketId(socketId)

      if (isLoggedIn) {
        if (terms?.version !== lastApprovedTermsVersion) {
          navigate(BoatChargingRouteName.boatChargingTermsAndConditions)

          return
        } else {
          navigate(BoatChargingRouteName.boatCharging) // TODO: initiate payment flow
        }
      } else {
        navigate(BoatChargingRouteName.boatChargingGuestEmail)
      }
    },
    [form, isLoggedIn, navigate, setSocketId, terms, lastApprovedTermsVersion],
  )

  if (isLoggedIn && terms?.version === lastApprovedTermsVersion) {
    return (
      <Button
        disabled={isLoading || isError}
        icon={{name: 'boat-charging-free', color: 'inverse'}}
        label="Betalen en laden"
        marginTop="auto"
        onPress={form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    )
  }

  return (
    <Button
      disabled={!!isLoggedIn && (isLoading || isError)}
      isLoading={!!isLoggedIn && isLoading}
      label="Verder met opladen"
      marginTop="auto"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingDetailsChooseSocketSubmitButton"
    />
  )
}
