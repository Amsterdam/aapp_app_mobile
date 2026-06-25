import {Amplify} from 'aws-amplify'
import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  type AuthSession,
  type AuthUser,
} from 'aws-amplify/auth'
import {type BoatChargingOIDCConfigResponse} from '@/modules/boat-charging/types'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

export type BoatChargingOpenIdConnectTokens = {
  accessToken: string
  accessTokenExpirationInSeconds: number
  idToken?: string
  refreshToken?: string
  tokenType?: string
  username: string
}

const DEFAULT_ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 3600

let configuredOpenIdConnectConfigKey: string | null = null

const initBoatChargingOpenIdConnectConfig = (
  config: BoatChargingOIDCConfigResponse,
) => {
  const openIdConnectConfigKey = `${config.user_pool_id}:${config.client_id}`

  if (configuredOpenIdConnectConfigKey === openIdConnectConfigKey) {
    return
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: config.client_id,
        userPoolId: config.user_pool_id,
      },
    },
  })

  configuredOpenIdConnectConfigKey = openIdConnectConfigKey
}

const getAccessTokenExpirationInSeconds = (
  accessTokenExpirationInSeconds?: number,
): number => {
  if (!accessTokenExpirationInSeconds) {
    return DEFAULT_ACCESS_TOKEN_EXPIRATION_IN_SECONDS
  }

  const secondsUntilExpiration = dayjsFromUnix(
    accessTokenExpirationInSeconds,
  ).diff(dayjs(), 'second')

  return Math.max(secondsUntilExpiration, 0)
}

const sessionFromAuthSession = (
  session: AuthSession,
  username: string,
): BoatChargingOpenIdConnectTokens => {
  const accessToken = session.tokens?.accessToken
  const idToken = session.tokens?.idToken

  return {
    accessToken: accessToken?.toString() ?? '',
    accessTokenExpirationInSeconds: getAccessTokenExpirationInSeconds(
      accessToken?.payload?.exp,
    ),
    idToken: idToken?.toString(),
    refreshToken: undefined,
    tokenType: 'Bearer',
    username,
  }
}

const getPreviousSession = async (
  config: BoatChargingOIDCConfigResponse,
  forceRefresh = false,
): Promise<BoatChargingOpenIdConnectTokens> => {
  const currentUser = await getCurrentOpenIdConnectUser(config).catch(
    () => null,
  )

  if (!currentUser?.signInDetails?.loginId) {
    return Promise.reject(new Error('No current user found'))
  }

  const session = await fetchAuthSession({forceRefresh})

  if (!session.tokens?.accessToken) {
    return Promise.reject(new Error('No access token found in session'))
  }

  return sessionFromAuthSession(session, currentUser.signInDetails.loginId)
}

export const getStoredOpenIdConnectSession = async (
  config: BoatChargingOIDCConfigResponse,
): Promise<BoatChargingOpenIdConnectTokens | null> =>
  getPreviousSession(config, false)

export const signInWithOpenIdConnect = async (
  username: string,
  password: string,
  config: BoatChargingOIDCConfigResponse,
): Promise<BoatChargingOpenIdConnectTokens> => {
  initBoatChargingOpenIdConnectConfig(config)

  await signIn({
    username,
    password,
    options: {
      authFlowType: 'USER_SRP_AUTH',
    },
  })

  const session = await fetchAuthSession()

  return sessionFromAuthSession(session, username)
}

export const refreshOpenIdConnectAccessToken = async (
  config: BoatChargingOIDCConfigResponse,
): Promise<BoatChargingOpenIdConnectTokens> => getPreviousSession(config, true)

export const getCurrentOpenIdConnectUser = async (
  config: BoatChargingOIDCConfigResponse,
): Promise<AuthUser> => {
  initBoatChargingOpenIdConnectConfig(config)

  return getCurrentUser()
}

export const signOutFromOpenIdConnect = async (
  config: BoatChargingOIDCConfigResponse,
) => {
  initBoatChargingOpenIdConnectConfig(config)

  return signOut()
}
