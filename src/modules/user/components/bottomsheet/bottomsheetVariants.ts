import type {FC} from 'react'

export enum PersonalDetailsBottomSheetVariant {
  address = 'address',
  email = 'email',
  phone = 'phone',
  privacy = 'privacy',
}

export const bottomsheetVariants: Record<
  PersonalDetailsBottomSheetVariant,
  FC
> = {
  [PersonalDetailsBottomSheetVariant.privacy]: () => null, //TODO: create bottomsheet
  [PersonalDetailsBottomSheetVariant.address]: () => null, //TODO: create bottomsheet
  [PersonalDetailsBottomSheetVariant.email]: () => null, //TODO: create bottomsheet
  [PersonalDetailsBottomSheetVariant.phone]: () => null, //TODO: create bottomsheet
}
