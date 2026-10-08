import {getItemAsync, deleteItemAsync, setItemAsync} from 'expo-secure-store'

import {appInsights} from '@/providers/appinsights.provider'

export enum SecureItemKey {
  accessCode = 'accessCode',
  cityPassAccessToken = 'cityPassAccessToken',
  cityPassRefreshToken = 'cityPassRefreshToken',
  cityPasses = 'cityPasses',
  mijnAmsterdamAccessToken = 'mijnAmsterdamAccessToken',
  parkingPermitHolder = 'parkingPermitHolder',
  parkingVisitor = 'parkingVisitor',
  wasteCardNumber = 'wasteCardNumber',
}

export const setSecureItem = (key: SecureItemKey, value: string) =>
  new Promise((resolve, reject) => {
    setItemAsync(key, value, {requireAuthentication: false})
      .then(res => resolve(res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })

export const getSecureItem = (key: SecureItemKey): Promise<string | null> =>
  new Promise((resolve, reject) => {
    getItemAsync(key, {requireAuthentication: false})
      .then(res => resolve(res))
      .catch(reject)
  })

export const isSetSecureItem = (key: SecureItemKey): Promise<boolean> =>
  new Promise((resolve, reject) => {
    getItemAsync(key, {requireAuthentication: false})
      .then(res => resolve(!!res))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })

export const removeSecureItems = (
  keys: SecureItemKey[],
  exceptionOnFail = true,
) =>
  new Promise((resolve, reject) => {
    Promise.all(
      keys.map(key => deleteItemAsync(key, {requireAuthentication: false})),
    )
      .then(res => resolve(res))
      .catch((err: Error) => {
        if (exceptionOnFail) {
          appInsights.trackException({
            exception: err,
          })
        }

        reject(err)
      })
  })

export const removeAllSecureItems = () =>
  new Promise((resolve, reject) => {
    Promise.all(
      Object.keys(SecureItemKey).map(key =>
        deleteItemAsync(key, {requireAuthentication: false}),
      ),
    )
      .then(() => resolve(true))
      .catch((err: Error) => {
        appInsights.trackException({
          exception: err,
        })
        reject(err)
      })
  })
