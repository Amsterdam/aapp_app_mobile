import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {formatPhoneNumber} from '@/utils/formatPhoneNumber'

type Props = {
  phoneNumber: string
} & Omit<ButtonProps, 'iconName' | 'label' | 'onPress'>

export const PhoneButton = ({
  accessibilityLabel,
  phoneNumber,
  ...buttonProps
}: Props) => {
  const openPhoneUrl = useOpenPhoneUrl()
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber)

  return (
    <Row>
      <Button
        accessibilityLanguage="nl-NL"
        {...buttonProps}
        accessibilityLabel={
          accessibilityLabel ||
          `Bel ${(formattedPhoneNumber ?? '').split(' ').join(', ')}`
        }
        icon={{isFilled: true, name: 'phone'}}
        label={formattedPhoneNumber}
        onPress={() => {
          openPhoneUrl(phoneNumber)
        }}
      />
    </Row>
  )
}
