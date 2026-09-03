import {
  authenticateAsync,
  getEnrolledLevelAsync,
  SecurityLevel,
} from 'expo-local-authentication'
import {useState, useCallback, useEffect} from 'react'

export const useBiometrics = ({
  autoTrigger,
  cancelButtonText = 'Annuleer',
  disableDeviceFallback = false,
  fallbackPromptMessage,
  promptMessage,
}: {
  /**
   * trigger biometrics when the hook is called for the first time
   * @default true
   * @platform Android, iOS
   */
  autoTrigger?: boolean
  /**
   * Text to be displayed for the cancel button on biometric prompts
   * @default 'Annuleer''
   * @platform Android
   */
  cancelButtonText?: string
  disableDeviceFallback?: boolean
  /**
   * Message that will be shown when FaceID or TouchID has failed and a passcode has been set on the device.
   * @platform iOS
   */
  fallbackPromptMessage?: string
  /**
   * Message that will be displayed in the biometrics prompt
   * @platform Android, iOS
   */
  promptMessage: string
}) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [failed, setFailed] = useState(false)
  const authenticate = useCallback(async () => {
    setAuthenticated(false)

    const enrolledLevel = await getEnrolledLevelAsync()

    if (enrolledLevel !== SecurityLevel.NONE) {
      authenticateAsync({
        promptMessage,
        fallbackLabel: fallbackPromptMessage,
        cancelLabel: cancelButtonText,
        disableDeviceFallback,
      }).then(
        ({success}) => {
          if (success) {
            setAuthenticated(true)
            setFailed(false)
          } else {
            setFailed(true)
          }
        },
        () => {
          setFailed(true)
        },
      )
    } else {
      setFailed(true)
    }
  }, [
    cancelButtonText,
    disableDeviceFallback,
    fallbackPromptMessage,
    promptMessage,
  ])

  useEffect(() => {
    if (autoTrigger) {
      void authenticate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTrigger])

  return {authenticated, authenticate, failed}
}
