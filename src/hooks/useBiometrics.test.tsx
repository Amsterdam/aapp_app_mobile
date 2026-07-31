import {act, renderHook, waitFor} from '@testing-library/react-native'
import {
  authenticateAsync,
  getEnrolledLevelAsync,
  SecurityLevel,
} from 'expo-local-authentication'
import {useBiometrics} from '@/hooks/useBiometrics'

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(),
  getEnrolledLevelAsync: jest.fn(),
  SecurityLevel: {
    NONE: 0,
    BIOMETRIC: 1,
  },
}))

const getEnrolledLevelAsyncMock = jest.mocked(getEnrolledLevelAsync)
const authenticateAsyncMock = jest.mocked(authenticateAsync)

describe('useBiometrics', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fails authentication when no biometrics are enrolled', async () => {
    getEnrolledLevelAsyncMock.mockResolvedValue(SecurityLevel.NONE)

    const {result} = renderHook(() =>
      useBiometrics({
        autoTrigger: false,
        promptMessage: 'Prompt',
      }),
    )

    await act(async () => {
      await result.current.authenticate()
    })

    await waitFor(() => {
      expect(result.current.failed).toBe(true)
    })

    expect(result.current.authenticated).toBe(false)
    expect(authenticateAsyncMock).not.toHaveBeenCalled()
  })

  it('authenticates when enrolled biometrics succeed', async () => {
    getEnrolledLevelAsyncMock.mockResolvedValue(SecurityLevel.BIOMETRIC_STRONG)
    authenticateAsyncMock.mockResolvedValue({success: true} as never)

    const {result} = renderHook(() =>
      useBiometrics({
        autoTrigger: false,
        promptMessage: 'Prompt',
      }),
    )

    await act(async () => {
      await result.current.authenticate()
    })

    await waitFor(() => {
      expect(result.current.authenticated).toBe(true)
    })

    expect(result.current.failed).toBe(false)
    expect(authenticateAsyncMock).toHaveBeenCalledTimes(1)
  })
})
