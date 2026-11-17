import {type ReduxDispatch} from '@/hooks/redux/types'
import {cityPassApi} from '@/modules/city-pass/service'
import {setTokenExpiration} from '@/modules/city-pass/slice'
import {CityPassEndpointName} from '@/modules/city-pass/types'
import {getSecureTokens} from '@/modules/city-pass/utils/getSecureTokens'
import {logout} from '@/modules/city-pass/utils/logout'
import {setSecureTokens} from '@/modules/city-pass/utils/setSecureTokens'
import {devLog, devError} from '@/processes/development'
import {setSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {SecureItemKey} from '@/utils/secureStorage'

type TokenSet = {accessToken: string; refreshToken: string}

const saveTokens = (
  access_token: string,
  refresh_token: string,
  accessTokenExpiration: string,
  refreshTokenExpiration: string,
  dispatch: ReduxDispatch,
  resolve: (value: TokenSet | PromiseLike<TokenSet>) => void,
  reject: (reason?: unknown) => void,
  failRetry?: (e: unknown) => void,
) => {
  dispatch(
    setTokenExpiration({
      accessTokenExpiration,
      refreshTokenExpiration,
    }),
  )
  setSecureTokens(access_token, refresh_token).then(
    () => {
      dispatch(setSecureItemUpdatedTimestamp(SecureItemKey.cityPassAccessToken))
      dispatch(
        setSecureItemUpdatedTimestamp(SecureItemKey.cityPassRefreshToken),
      )
      devLog('Tokens successful refreshed')
      failRetry?.('New tokens, so old request should fail')
      resolve({accessToken: access_token, refreshToken: refresh_token})
    },
    () => {
      devError('refresh tokens save failed')
      reject(new Error('New tokens could not be saved'))
    },
  )
}

export const refreshTokens = (
  dispatch: ReduxDispatch,
  failRetry?: (e?: unknown) => void,
): Promise<TokenSet> =>
  new Promise((resolve, reject) => {
    void getSecureTokens().then(({refreshToken}) => {
      if (refreshToken) {
        dispatch(
          cityPassApi.endpoints[CityPassEndpointName.refreshToken].initiate(
            refreshToken,
          ),
        )
          .unwrap()
          .then(
            ({
              access_token,
              refresh_token,
              access_token_expiration,
              refresh_token_expiration,
            }) =>
              saveTokens(
                access_token,
                refresh_token,
                access_token_expiration,
                refresh_token_expiration,
                dispatch,
                resolve,
                reject,
                failRetry,
              ),
            async () => {
              devError('Token refresh failed, you are now logged out')
              await logout('logoutWarning', dispatch, true)
              failRetry?.('Session ended')
              reject(new Error('Token refresh failed'))
            },
          )
      }
    })
  })
