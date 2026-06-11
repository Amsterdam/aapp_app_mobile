import {type OktaAuthOptions, OktaAuth} from '@okta/okta-auth-js'
import * as SecureStore from 'expo-secure-store'
import {
  getSecureItem,
  setSecureItem,
  type SecureItemKey,
} from '@/utils/secureStorage'

let authClient: OktaAuth | null = null

const storageProvider = {
  getItem: (key: string) => getSecureItem(key as SecureItemKey),
  setItem: (key: string, value: string) =>
    setSecureItem(key as SecureItemKey, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}

export const initAuthClient = (config: OktaAuthOptions) => {
  if (authClient) return authClient // already initialized, ignore

  if (!config?.issuer || !config?.clientId || !config?.redirectUri) {
    throw new Error('initAuthClient requires issuer, clientId, and redirectUri')
  }

  authClient = new OktaAuth({
    ...config,
    scopes: config.scopes ?? ['openid', 'email', 'profile'],
    tokenManager: {
      storage: storageProvider,
      autoRenew: true,
      ...(config.tokenManager ?? {}),
    },
  })

  return authClient
}

export const getAuthClient = () => {
  if (!authClient) {
    throw new Error(
      'authClient not initialized — call initAuthClient(config) first',
    )
  }

  return authClient
}
