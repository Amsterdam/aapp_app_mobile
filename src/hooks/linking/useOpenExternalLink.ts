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

export function useOpenExternalLink({
  redirectKey,
}: {
  redirectKey: RedirectKey
}): {
  isError: boolean
  isLoading: boolean
  onPress: () => void
}
export function useOpenExternalLink({url}: {url: string}): {
  isError: false
  isLoading: false
  onPress: () => void
}
export function useOpenExternalLink({redirectKey, url}: ExternalLinkProps): {
  isError: boolean
  isLoading: boolean
  onPress: () => void
}

export function useOpenExternalLink({redirectKey, url}: ExternalLinkProps) {
  const {
    openRedirect,
    isLoading: isRedirectLoading,
    isError: isRedirectError,
  } = useOpenRedirect()
  const openUrl = useOpenUrl()

  const onPress = useCallback(() => {
    if (redirectKey) {
      openRedirect(redirectKey)
    } else {
      openUrl(url)
    }
  }, [openRedirect, openUrl, redirectKey, url])

  return {
    onPress,
    isLoading: redirectKey ? isRedirectLoading : false,
    isError: redirectKey ? isRedirectError : false,
  }
}
