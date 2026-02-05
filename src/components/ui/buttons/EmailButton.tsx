import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {emailPronounce} from '@/utils/accessibility/emailPronounce'

type Props = {
  email: string
  subject?: string
} & Omit<ButtonProps, 'iconName' | 'label' | 'onPress'>

export const EmailButton = ({email, subject, ...buttonProps}: Props) => {
  const openMailUrl = useOpenMailUrl()

  return (
    <Row>
      <Button
        {...buttonProps}
        accessibilityLabel={accessibleText(
          'Stuur een e-mail naar',
          emailPronounce(email),
        )}
        ellipsizeMode="tail"
        icon={{name: 'mail'}}
        label={email}
        onPress={() => {
          openMailUrl(email, subject)
        }}
      />
    </Row>
  )
}
