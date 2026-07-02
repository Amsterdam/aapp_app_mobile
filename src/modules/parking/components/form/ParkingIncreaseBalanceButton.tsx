import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  useAccountDetailsQuery,
  useIncreaseBalanceMutation,
} from '@/modules/parking/service'
import {setWalletBalanceIncreaseStartBalance} from '@/modules/parking/slice'
import {ParkingApiLocale} from '@/modules/parking/types'

type FieldValues = {
  amount?: number
}

export const ParkingIncreaseBalanceButton = () => {
  const dispatch = useDispatch()
  const {handleSubmit, formState} = useFormContext()
  const [increaseBalance] = useIncreaseBalanceMutation()
  const {data} = useAccountDetailsQuery()

  const navigation = useNavigation<ParkingRouteName>()
  const openWebUrl = useOpenWebUrl()
  const onSubmit = useCallback(
    ({amount}: FieldValues) => {
      if (amount) {
        dispatch(
          setWalletBalanceIncreaseStartBalance(
            data?.wallet?.balance ?? undefined,
          ),
        )

        return increaseBalance({
          balance: {
            amount,
          },
          locale: ParkingApiLocale.nl,
        })
          .unwrap()
          .then(result => {
            if (result.redirect_url) {
              openWebUrl(result.redirect_url)
            }

            navigation.popTo(ParkingRouteName.dashboard)
          })
      }
    },
    [dispatch, data?.wallet?.balance, increaseBalance, navigation, openWebUrl],
  )

  return (
    <Button
      accessibilityHint="Opent in webbrowser"
      accessibilityRole="link"
      disabled={formState.isSubmitting}
      icon={{name: 'link-external', size: 'md'}}
      label="Nu betalen"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingIncreaseBalanceExternalLinkButton"
    />
  )
}
