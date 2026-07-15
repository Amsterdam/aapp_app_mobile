import {useCallback, useEffect} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {
  selectCodeVerifier,
  setCodeVerifier,
} from '@/modules/mijn-amsterdam/slice'
import {loginMijnAmsterdamExternalLinks} from '@/modules/mijn-amsterdam/utils/loginMijnAmsterdamExternalLinks'
import {generatePkceCodeVerifier, SHA256Base64url} from '@/utils/encryption'

export const useLoginMijnAmsterdam = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCodeVerifier(generatePkceCodeVerifier()))
  }, [dispatch])
  const codeVerifier = useSelector(selectCodeVerifier)
  const loginUrl = useUrlForEnv(loginMijnAmsterdamExternalLinks)
  const openWebUrl = useOpenWebUrl()

  return useCallback(() => {
    if (codeVerifier) {
      openWebUrl(loginUrl + '?codeChallenge=' + SHA256Base64url(codeVerifier))
    }
  }, [loginUrl, openWebUrl, codeVerifier])
}
