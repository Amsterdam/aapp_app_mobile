import {useCallback} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/form/AddressTopTaskButton'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName, AddressRouteName} from '@/modules/address/routes'
import {useMyAddress} from '@/modules/address/slice'
import {type Address} from '@/modules/address/types'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/utils/getAddressLineWithCityIfNotAmsterdam'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  moduleSlug: ModuleSlug
  onPress: (address: Address) => void
} & TestProps

export const MyAddressButton = ({testID, onPress, moduleSlug}: Props) => {
  const {navigate} = useNavigation()
  const setLocationType = useSetLocationType(moduleSlug)
  const myAddress = useMyAddress()

  const onPressAddressButton = useCallback(() => {
    if (!myAddress) {
      navigate(AddressModalName.myAddressForm)

      return
    }

    onPress(myAddress)
  }, [onPress, myAddress, navigate])

  return (
    <Row align="between">
      <AddressTopTaskButton
        logName={`BottomSheetAddAddressButton${myAddress?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
        onPress={onPressAddressButton}
        testID={testID}
        text={
          myAddress
            ? getAddressLineWithCityIfNotAmsterdam(myAddress)
            : 'Vul een adres in'
        }
      />
      {!!myAddress && (
        <Button
          accessibilityLabel="Wijzig mijn adres"
          label="Wijzig"
          minWidth={90}
          onPress={() => {
            navigate(ModuleSlug.address, {
              screen: AddressRouteName.address,
            })

            setLocationType('address')
          }}
          testID={`${testID}ChangeAddressButton`}
          variant="tertiary"
        />
      )}
    </Row>
  )
}
