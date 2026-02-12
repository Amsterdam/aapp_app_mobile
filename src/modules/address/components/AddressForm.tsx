import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import type {
  Address,
  AddressCity,
  HighAccuracyPurposeKey,
} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useModules} from '@/hooks/useModules'
import {alerts} from '@/modules/address/alerts'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {AddressSearchResults} from '@/modules/address/components/form/AddressSearchResults'
import {LocationTopTaskButton} from '@/modules/address/components/form/LocationTopTaskButton'
import {MyAddressButton} from '@/modules/address/components/form/MyAddressButton'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {
  addAddress,
  addRecentAddress,
  setModuleCustomAddress,
  useMyAddress,
} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

export type AddressSearchFields = {
  city: AddressCity | undefined
  number: string
  street: string
}

type Props =
  | {
      highAccuracyPurposeKey?: HighAccuracyPurposeKey
      moduleSlug: ModuleSlug
      saveAsMyAddress?: never
    }
  | {
      highAccuracyPurposeKey?: HighAccuracyPurposeKey
      moduleSlug?: never
      saveAsMyAddress?: true
    }

export const AddressForm = ({
  highAccuracyPurposeKey,
  moduleSlug,
  saveAsMyAddress,
}: Props) => {
  const form = useFormContext<AddressSearchFields>()
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const setLocationType = useSetLocationType(moduleSlug || ModuleSlug.address)
  const route = useRoute<AddressModalName.myAddressForm>()
  const myAddress = useMyAddress()
  const {enabledModules} = useModules()
  const {shouldShowList} = useGetAddressFormList()

  const {setAlert} = useAlert()

  const onPressAddress = useCallback(
    (address: Address) => {
      dispatch(addRecentAddress(address))

      if (myAddress?.bagId === address.bagId) {
        setLocationType('address')
      } else if (saveAsMyAddress) {
        dispatch(addAddress(address))
        setLocationType('address')
        enabledModules?.forEach(({onMyAddressChanged}) => {
          void onMyAddressChanged?.(address, dispatch)
        })
      } else {
        dispatch(
          setModuleCustomAddress({
            moduleSlug: moduleSlug!,
            address,
          }),
        )
        setLocationType('custom')
      }

      if (route?.name === AddressModalName.myAddressForm) {
        setAlert(alerts.addAddressSuccess)
      }

      goBack()
    },
    [
      dispatch,
      myAddress?.bagId,
      saveAsMyAddress,
      route?.name,
      goBack,
      setLocationType,
      enabledModules,
      moduleSlug,
      setAlert,
    ],
  )

  const isSearching = form.watch('street')?.length

  return (
    <Column gutter="lg">
      {!!shouldShowList && (
        <AddressSearchResults onPressResult={onPressAddress} />
      )}

      {!isSearching && !saveAsMyAddress && !!moduleSlug && (
        <Column gutter="smd">
          <MyAddressButton
            moduleSlug={moduleSlug}
            onPress={() => {
              setLocationType('address')
              goBack()
            }}
            testID="ChooseAddressScreenMyAddressButton"
          />

          <LocationTopTaskButton
            highAccuracyPurposeKey={highAccuracyPurposeKey}
            moduleSlug={moduleSlug}
            testID="ChooseAddressScreenLocationTopTaskButton"
          />
        </Column>
      )}

      {!isSearching && <RecentAddresses onPress={onPressAddress} />}
    </Column>
  )
}
