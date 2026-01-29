import {AccessibilityProps} from 'react-native'
import type {IconProps} from '@/components/ui/media/Icon'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {BaseAddress, Address} from '@/modules/address/types'

type Props<AddressType extends Address | BaseAddress> = {
  address: AddressType
  icon?: IconProps
  label: string
  'logging-label'?: string
  onPress: (address: AddressType) => void
} & Pick<AccessibilityProps, 'accessibilityLabel'> &
  TestProps

export const SuggestionButton = <AddressType extends Address | BaseAddress>({
  icon,
  label,
  address,
  onPress,
  testID,
  accessibilityLabel,
  'logging-label': loggingLabel,
}: Props<AddressType>) => (
  <TopTaskButton
    accessibilityHint="Tik om dit adres te selecteren"
    accessibilityLabel={accessibilityLabel}
    accessibilityLanguage="nl-NL"
    accessibilityRole="button"
    icon={{name: 'map-marker', ...icon}}
    insetHorizontal="sm"
    insetVertical="xs"
    logging-label={loggingLabel}
    logName="SuggestionButton"
    onPress={() => onPress(address)}
    testID={testID}
    text={label}
  />
)
