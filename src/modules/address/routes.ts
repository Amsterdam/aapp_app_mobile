import type {HighAccuracyPurposeKey} from '@/modules/address/types'
import type {ModuleSlug} from '@/modules/slugs'

export enum AddressRouteName {
  address = 'Address',
  chooseAddress = 'ChooseAddress',
}

export type AddressStackParams = {
  [AddressRouteName.address]: undefined
  [AddressRouteName.chooseAddress]: {
    highAccuracyPurposeKey?: HighAccuracyPurposeKey
    moduleSlug?: ModuleSlug
  }
}

export enum AddressModalName {
  myAddressForm = 'MyAddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type AddressModalParams = {
  [AddressModalName.myAddressForm]: {showAlertAfterSuccess: boolean}
  [AddressModalName.privacyInfo]: undefined
}
