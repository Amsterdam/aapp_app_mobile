import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {TestProps} from '@/components/ui/types'
import {
  useOpenExternalLink,
  type ExternalLinkProps,
} from '@/hooks/linking/useOpenExternalLink'

type Props = ExternalLinkProps & ButtonProps & TestProps

export const ExternalLinkButton = ({
  accessibilityHint,
  label,
  redirectKey,
  testID,
  url,
  ...props
}: Props) => {
  const {onPress, isLoading, isError} = useOpenExternalLink({
    redirectKey,
    url,
  } as ExternalLinkProps)

  return (
    <Button
      accessibilityHint={`${accessibilityHint ? accessibilityHint + '. ' : ''}Opent in ${redirectKey || url?.startsWith('http') ? 'webbrowser' : 'andere app'}.`}
      accessibilityRole="link"
      icon={{name: 'link-external', size: 'md'}}
      isError={isError}
      isLoading={isLoading}
      label={label}
      onPress={onPress}
      testID={testID}
      {...props}
    />
  )
}
