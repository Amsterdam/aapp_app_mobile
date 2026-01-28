import {Button} from '@/components/ui/buttons/Button'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useModules} from '@/hooks/useModules'
import {alerts} from '@/modules/address/alerts'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress, useMyAddress} from '@/modules/address/slice'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/utils/getAddressLineWithCityIfNotAmsterdam'
import {useAlert} from '@/store/slices/alert'
import {useTheme} from '@/themes/useTheme'

export const DisplayAddress = () => {
  const address = useMyAddress()
  const dispatch = useDispatch()
  const navigation = useNavigation<AddressModalName>()
  const {size} = useTheme()
  const {setAlert} = useAlert()
  const {enabledModules} = useModules()

  const removeAddressAndShowAlert = () => {
    dispatch(removeAddress())
    setAlert(alerts.deleteAddressSuccess)
    enabledModules?.forEach(({onMyAddressChanged}) => {
      void onMyAddressChanged?.(null, dispatch)
    })
  }

  return (
    <Row>
      <Column flex={1}>
        <Row>
          <TopTaskButton
            accessibilityHint="Tik om het adres te wijzigen"
            flex={1}
            hitSlop={{bottom: size.spacing.md, top: size.spacing.md}}
            iconName="house"
            logName={
              address?.addressLine1 ? 'AddressChangeButton' : 'AddressAddButton'
            }
            onPress={() => navigation.navigate(AddressModalName.myAddressForm)}
            testID="AddressAddButton"
            text={
              address
                ? getAddressLineWithCityIfNotAmsterdam(address)
                : 'Vul een adres in'
            }
            title="Mijn adres"
          />
          {!!address && (
            <Button
              accessibilityLabel="Verwijder mijn adres"
              iconName="trash-bin"
              onPress={removeAddressAndShowAlert}
              testID="AddressDeleteButton"
              variant="tertiary"
            />
          )}
        </Row>
      </Column>
    </Row>
  )
}
