import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {accessibleText} from '@/utils/accessibility/accessibleText'
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
          accessibilityLabel ||
          accessibleText(
            'Bel',
            ...(formatPhoneNumber(phoneNumber) ?? '').split(' '),
          )
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
