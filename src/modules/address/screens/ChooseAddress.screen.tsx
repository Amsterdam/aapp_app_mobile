import {FormProvider, useForm} from 'react-hook-form'
import type {NavigationProps} from '@/app/navigation/types'
import type {AddressRouteName} from '@/modules/address/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {
  AddressForm,
  type AddressSearchFields,
} from '@/modules/address/components/AddressForm'
import {AddressSearchField} from '@/modules/address/components/form/AddressSearchField'

type Props = NavigationProps<AddressRouteName.chooseAddress>

export const ChooseAddressScreen = ({route}: Props) => {
  const {highAccuracyPurposeKey, moduleSlug} = route.params
  const addressForm = useForm<AddressSearchFields>()

  return (
    <FormProvider {...addressForm}>
      <Screen
        hasStickyAlert
        keyboardAware
        stickyHeader={<AddressSearchField />}
        testID="ChooseAddressScreen">
        <Box grow>
          <AddressForm
            highAccuracyPurposeKey={highAccuracyPurposeKey}
            moduleSlug={moduleSlug}
          />
        </Box>
      </Screen>
    </FormProvider>
  )
}
