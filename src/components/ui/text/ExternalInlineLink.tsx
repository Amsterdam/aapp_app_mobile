import {type PropsWithChildren} from 'react'
import {InlineLink, type InlineLinkProps} from '@/components/ui/text/InlineLink'
import {
  type ExternalLinkProps,
  useOpenExternalLink,
} from '@/hooks/linking/useOpenExternalLink'

type Props = ExternalLinkProps &
  Omit<
    InlineLinkProps,
    'onPress' | 'isExternal' | 'accessibilityRole' | 'variant' | 'actionIcon'
  >

export const ExternalInlineLink = ({
  redirectKey,
  children,
  url,
  testID,
  accessibilityHint,
  ...props
}: PropsWithChildren<Props>) => {
  const {onPress} = useOpenExternalLink({redirectKey, url} as ExternalLinkProps)

  return (
    <InlineLink
      accessibilityHint={`${accessibilityHint ? accessibilityHint + '. ' : ''}Opent in ${redirectKey || url?.startsWith('http') ? 'webbrowser' : 'andere app'}.`}
      onPress={onPress}
      testID={testID}
      variant="external"
      {...props}>
      {children}
    </InlineLink>
  )
}
