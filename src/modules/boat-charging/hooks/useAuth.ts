import {useState, useEffect, useCallback, useMemo} from 'react'
import type {
  AccessToken,
  AuthState,
  CustomUserClaims,
  RefreshToken,
  UserClaims,
} from '@okta/okta-auth-js'
import {getAuthClient} from '@/modules/boat-charging/utils/okta'

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown authentication error'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserClaims<CustomUserClaims> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const authClient = useMemo(() => getAuthClient(), [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await authClient.isAuthenticated()

        setIsAuthenticated(authenticated)

        if (authenticated) {
          setUser(await authClient.getUser())
        }
      } catch (e) {
        setError(getErrorMessage(e))
      } finally {
        setLoading(false)
      }
    }

    void checkAuth()

    const handler = async (authState: AuthState) => {
      const authenticated = authState.isAuthenticated ?? false

      setIsAuthenticated(authenticated)
      setUser(authenticated ? await authClient.getUser() : null)
    }

    authClient.authStateManager.subscribe(handler)
    void authClient.start()

    return () => {
      authClient.authStateManager.unsubscribe(handler)
      void authClient.stop()
    }
  }, [authClient])

  const signOut = useCallback(async () => {
    try {
      await authClient.revokeAccessToken()
      await authClient.revokeRefreshToken()
      authClient.tokenManager.clear()
      setIsAuthenticated(false)
      setUser(null)
    } catch (e) {
      setError(getErrorMessage(e))
    }
  }, [authClient])

  const signIn = useCallback(
    async (username: string, password: string) => {
      setLoading(true)
      setError(null)

      try {
        const transaction = await authClient.signInWithCredentials({
          username,
          password,
        })

        if (transaction.status !== 'SUCCESS') {
          throw new Error(`Unexpected status: ${transaction.status}`)
        }

        const {tokens} = await authClient.token.getWithoutPrompt({
          sessionToken: transaction.sessionToken,
          scopes: ['openid', 'email', 'profile', 'offline_access'],
        })

        authClient.tokenManager.setTokens(tokens)
        setIsAuthenticated(true)
        setUser(await authClient.getUser())
      } catch (e) {
        setError(getErrorMessage(e))
        throw e
      } finally {
        setLoading(false)
      }
    },
    [authClient],
  )

  // Returns the raw access token string, renewing via refresh token if expired
  const getAccessToken = useCallback(async () => {
    try {
      const token = (await authClient.tokenManager.get('accessToken'))

      if (!token) return null

      if (authClient.tokenManager.hasExpired(token)) {
        const renewed = (await authClient.tokenManager.renew('accessToken'))

        return renewed?.accessToken ?? null
      }

      return token.accessToken
    } catch {
      await signOut()

      return null
    }
  }, [authClient, signOut])

  // Returns the raw refresh token string
  const getRefreshToken = useCallback(async () => {
    try {
      const token = (await authClient.tokenManager.get('refreshToken'))

      return token?.refreshToken ?? null
    } catch {
      return null
    }
  }, [authClient])

  // Manually force a token renewal (refresh token → new access + refresh token)
  const renewTokens = useCallback(async () => {
    try {
      await authClient.tokenManager.renew('accessToken')
    } catch (e) {
      setError(getErrorMessage(e))
      throw e
    }
  }, [authClient])

  return {
    isAuthenticated,
    user,
    loading,
    error,
    signIn,
    signOut,
    getAccessToken,
    getRefreshToken,
    renewTokens,
  }
}
