import {generatePkceCodeVerifier} from '@/utils/encryption'

describe('generatePkceCodeVerifier', () => {
  const originalCrypto = global.crypto

  afterEach(() => {
    Object.defineProperty(global, 'crypto', {
      configurable: true,
      value: originalCrypto,
    })
  })

  it('returns a base64url verifier without padding from secure random bytes', () => {
    Object.defineProperty(global, 'crypto', {
      configurable: true,
      value: {
        getRandomValues: (typedArray: Uint8Array) => {
          typedArray.set(
            Uint8Array.from({length: typedArray.length}, (_, index) => index),
          )

          return typedArray
        },
      },
    })

    expect(generatePkceCodeVerifier()).toBe(
      'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8',
    )
  })
})
