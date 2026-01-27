import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressSwitchSaveMyAddress} from '@/modules/address/components/AddressSwitchSaveMyAddress'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {AddressRouteName} from '@/modules/address/routes'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {
  getAddressSwitchAccessibilityLabel,
  getAddressSwitchIcon,
  getAddressSwitchLabel,
} from '@/modules/address/utils/getAddressSwitchProps'
import {ModuleSlug} from '@/modules/slugs'

type AddressSwitcherProps = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  moduleSlug: ModuleSlug
  noAddressText?: string
  noAddressTitle?: string
} & TestProps

export const AddressSwitch = ({
  testID,
  noAddressText,
  noAddressTitle,
  moduleSlug,
  highAccuracyPurposeKey = HighAccuracyPurposeKey.PreciseLocationAddressLookup,
}: AddressSwitcherProps) => {
  const {navigate} = useNavigation()

  const {address, shouldShowSaveAsMyAddress, locationType, isFetching} =
    useSelectedAddress(moduleSlug)

  const iconName = useMemo(
    () => getAddressSwitchIcon(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const label = useMemo(
    () => getAddressSwitchLabel(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const accessibilityLabel = useMemo(
    () => getAddressSwitchAccessibilityLabel(locationType, address, isFetching),
    [address, isFetching, locationType],
  )

  const onNavigateToAddressForm = () =>
    navigate(ModuleSlug.address, {
      screen: AddressRouteName.chooseAddress,
      params: {highAccuracyPurposeKey, moduleSlug},
    })

  return (
    <Column gutter="xl">
      <NavigationButton
        accessibilityLabel={accessibilityLabel}
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        border
        emphasis="default"
        iconName={iconName}
        iconSize="md"
        onPress={onNavigateToAddressForm}
        testID={testID}
        title={label}
      />
      {!address && !!noAddressText && (
        <Column gutter="md">
          <Column gutter="sm">
            <Title text={noAddressTitle ?? 'Geen adres'} />
            <Paragraph>{noAddressText}</Paragraph>
          </Column>
          <Button
            label="Adres invullen"
            onPress={onNavigateToAddressForm}
            testID="AddressSwitchChooseAddressButton"
          />
        </Column>
      )}

      <AddressSwitchSaveMyAddress
        moduleSlug={moduleSlug}
        shouldShowSaveAsMyAddress={shouldShowSaveAsMyAddress}
      />
    </Column>
  )
}
