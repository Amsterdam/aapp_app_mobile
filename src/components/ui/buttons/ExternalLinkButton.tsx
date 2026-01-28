import {useCallback} from 'react'
import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {TestProps} from '@/components/ui/types'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {RedirectKey} from '@/modules/redirects/types'

type Props = {
  redirectKey?: RedirectKey
  url?: string
} & ButtonProps &
  TestProps

export const ExternalLinkButton = ({
  accessibilityHint,
  label,
  redirectKey,
  testID,
  url,
  ...props
}: Props) => {
  const {openRedirect, isLoading, isError} = useOpenRedirect()
  const openUrl = useOpenUrl()

  const onPress = useCallback(() => {
    if (redirectKey) {
      openRedirect(redirectKey)
    } else if (url) {
      openUrl(url)
    }
  }, [openRedirect, openUrl, redirectKey, url])

  return (
    <Button
      accessibilityHint={`${accessibilityHint ? accessibilityHint + '. ' : ''}Opent in ${redirectKey || url?.startsWith('http') ? 'webbrowser' : 'andere app'}.`}
      accessibilityRole="link"
      iconName="link-external"
      iconSize="md"
      isError={isError}
      isLoading={isLoading}
      label={label}
      onPress={onPress}
      testID={testID}
      {...props}
    />
  )
}
