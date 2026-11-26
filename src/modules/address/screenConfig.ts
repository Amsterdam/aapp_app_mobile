import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AddressModalName,
  ModuleModalParams,
  AddressRouteName,
  type ModuleStackParams,
} from '@/modules/address/routes'
import {ChooseAddressScreen} from '@/modules/address/screens/ChooseAddress.screen'
import {MyAddressFormScreen} from '@/modules/address/screens/MyAddressForm.screen'

export const screenConfig: StackNavigationRoutes<ModuleStackParams> = {
  [AddressRouteName.chooseAddress]: {
    component: ChooseAddressScreen,
    name: AddressRouteName.chooseAddress,
    options: {
      headerTitle: 'Kies adres',
    },
    screenType: 'default',
  },
}

export const modals: StackNavigationRoutes<
  ModuleModalParams,
  AddressModalName
> = {
  [AddressModalName.myAddressForm]: {
    component: MyAddressFormScreen,
    name: AddressModalName.myAddressForm,
  },
}
