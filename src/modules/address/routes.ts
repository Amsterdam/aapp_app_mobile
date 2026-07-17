import type {HighAccuracyPurposeKey} from '@/modules/address/types'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

export enum AddressRouteName {
  address = 'Address',
  chooseAddress = 'ChooseAddress',
}

export type ModuleStackParams = {
  [AddressRouteName.address]: undefined
  [AddressRouteName.chooseAddress]: {
    highAccuracyPurposeKey?: HighAccuracyPurposeKey
    moduleSlug: ModuleSlug
  }
}

export enum AddressModalName {
  myAddressForm = 'MyAddressForm',
  privacyInfo = 'PrivacyInfo',
}

export type ModuleModalParams = {
  [AddressModalName.myAddressForm]: {showAlertAfterSuccess: boolean}
  [AddressModalName.privacyInfo]: undefined
}
