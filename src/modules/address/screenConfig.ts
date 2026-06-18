import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AddressModalName,
  ModuleModalParams,
  AddressRouteName,
  type ModuleStackParams,
} from '@/modules/address/routes'
import {AddressScreen} from '@/modules/address/screens/Address.screen'
import {ChooseAddressScreen} from '@/modules/address/screens/ChooseAddress.screen'
import {MyAddressFormScreen} from '@/modules/address/screens/MyAddressForm.screen'
import {PrivacyInfoScreen} from '@/modules/address/screens/PrivacyInfo.screen'

export const screenConfig: StackNavigationRoutes<ModuleStackParams> = {
  [AddressRouteName.address]: {
    component: AddressScreen,
    name: AddressRouteName.address,
    options: {
      headerTitle: 'Mijn adres',
    },
  },
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
  [AddressModalName.privacyInfo]: {
    component: PrivacyInfoScreen,
    name: AddressModalName.privacyInfo,
  },
}
