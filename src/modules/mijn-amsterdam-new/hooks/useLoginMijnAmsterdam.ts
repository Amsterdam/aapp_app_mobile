import {useCallback, useEffect} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {useIsLoggedIn} from '@/modules/mijn-amsterdam-new/hooks/useIsLoggedIn'
import {
  selectCodeVerifier,
  setCodeVerifier,
} from '@/modules/mijn-amsterdam-new/slice'
import {loginMijnAmsterdamExternalLinks} from '@/modules/mijn-amsterdam-new/utils/loginMijnAmsterdamExternalLinks'
import {generatePkceCodeVerifier, SHA256Base64url} from '@/utils/encryption'

export const useLoginMijnAmsterdam = () => {
  const dispatch = useDispatch()
  const {isLoggedIn} = useIsLoggedIn()

  useEffect(() => {
    //added this to make sure that login, logout and login again flow is working
    if (!isLoggedIn) {
      dispatch(setCodeVerifier(generatePkceCodeVerifier()))
    }
  }, [dispatch, isLoggedIn])
  const codeVerifier = useSelector(selectCodeVerifier)
  const loginUrl = useUrlForEnv(loginMijnAmsterdamExternalLinks)
  const openWebUrl = useOpenWebUrl()

  return useCallback(() => {
    if (codeVerifier) {
      openWebUrl(`${loginUrl}?codeChallenge=${SHA256Base64url(codeVerifier)}`)
    }
  }, [loginUrl, openWebUrl, codeVerifier])
}
