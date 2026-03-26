import {FormProvider, useForm} from 'react-hook-form'
import type {ParkingAccount} from '@/modules/parking/types'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAddSecureParkingAccountName} from '@/modules/parking/hooks/useAddSecureParkingAccountName'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {devLog} from '@/processes/development'

type ParkingAccountNameFormValues = {
  accountName: string
}

type Props = {
  account: ParkingAccount
}

export const ParkingAccountNameForm = ({account}: Props) => {
  const {reportCode, scope} = account
  const navigation = useNavigation()
  const form = useForm<ParkingAccountNameFormValues>()
  const {handleSubmit} = form
  const addSecureAccountName = useAddSecureParkingAccountName()
  const {secureAccount, isError, isLoading} = useGetSecureParkingAccount(
    scope,
    reportCode,
  )

  const onSubmit = async ({accountName}: ParkingAccountNameFormValues) => {
    try {
      await addSecureAccountName(account, accountName.trim())
      navigation.goBack()
    } catch (e) {
      devLog('Error updating parking account name', e)
    }
  }

  if (isLoading) {
    return null
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="ParkingAccountNameFormSomethingWentWrong" />
    )
  }

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <TextInputField
          defaultValue={secureAccount?.name ?? ''}
          hasClearButton={false}
          label="Naam"
          name="accountName"
          rules={{
            required: 'Vul een naam in',
            maxLength: {
              value: 50,
              message: 'De ingevoerde naam is te lang',
            },
            validate: (value: string) => {
              if (value.trim().length === 0) {
                return 'Vul een naam in'
              }

              return true
            },
          }}
          testID="ParkingAccountNameFormInputField"
        />
        <Button
          label="Opslaan"
          onPress={handleSubmit(onSubmit)}
          testID="ParkingAccountNameFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
