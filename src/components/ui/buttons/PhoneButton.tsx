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

  return (
    <Row>
      <Button
        accessibilityLanguage="nl-NL"
        {...buttonProps}
        accessibilityLabel={
          accessibilityLabel || `Bel ${formatPhoneNumber(phoneNumber)}`
        }
        icon={{isFilled: true, name: 'phone'}}
        label={formatPhoneNumber(phoneNumber)}
        onPress={() => {
          openPhoneUrl(phoneNumber)
        }}
      />
    </Row>
  )
}
