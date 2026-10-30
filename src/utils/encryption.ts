/* Importing react-native-get-random-values fixes the error "Native crypto module could not be used to get secure random number."
 * It seems to be required when using crypto-js with RN; see https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values'
import {encode} from 'base-64'
// eslint-disable-next-line depend/ban-dependencies
import {SHA256, enc} from 'crypto-js'
// eslint-disable-next-line no-restricted-imports
import {getUniqueIdSync} from 'react-native-device-info'

export const encryptWithSHA256 = (
  value: string,
  encoder: typeof enc.Hex = enc.Hex,
) => SHA256(value).toString(encoder)

export const SHA256EncryptedDeviceId = encryptWithSHA256(getUniqueIdSync())

export const SHA256Base64 = (message: string) =>
  encryptWithSHA256(message, enc.Base64)

export const SHA256Base64url = (message: string) =>
  urlEncodeBase64string(encryptWithSHA256(message, enc.Base64))

export const generatePkceCodeVerifier = (): string => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  const randomString = Array.from(randomBytes, randomByte =>
    String.fromCodePoint(randomByte),
  ).join('')

  return urlEncodeBase64string(encode(randomString))
}

export const urlEncodeBase64string = (base64String: string) =>
  base64String.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
