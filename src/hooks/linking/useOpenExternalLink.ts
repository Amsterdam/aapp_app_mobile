import {useCallback} from 'react'
import type {RedirectKey} from '@/modules/redirects/types'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'

export type ExternalLinkProps =
  | {
      redirectKey: RedirectKey
      url?: never
    }
  | {
      redirectKey?: never
      url: string
    }

export const useOpenExternalLink = ({redirectKey, url}: ExternalLinkProps) => {
  const {openRedirect, isLoading, isError} = useOpenRedirect()
  const openUrl = useOpenUrl()

  const onPress = useCallback(() => {
    if (redirectKey) {
      openRedirect(redirectKey)
    } else if (url) {
      openUrl(url)
    }
  }, [openRedirect, openUrl, redirectKey, url])

  return {onPress, isLoading, isError}
}
