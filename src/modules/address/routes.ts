import type {HighAccuracyPurposeKey} from '@/modules/address/exports/types'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

export enum AddressRouteName {
  chooseAddress = 'ChooseAddress',
}

export type ModuleStackParams = {
  [AddressRouteName.chooseAddress]: {
    highAccuracyPurposeKey?: HighAccuracyPurposeKey
    moduleSlug: ModuleSlug
  }
}

export enum AddressModalName {
  myAddressForm = 'MyAddressForm',
}

export type ModuleModalParams = {
  [AddressModalName.myAddressForm]: {showAlertAfterSuccess: boolean}
}
