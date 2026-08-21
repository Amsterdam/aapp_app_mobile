import {
  AuthenticationType,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import {useState, useEffect, useCallback, useMemo} from 'react'
import {Platform} from 'react-native'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {accessCodeSlice, selectUseBiometrics} from '@/modules/access-code/slice'
import {mapBiometricsAuthenticationTypeToIconName} from '@/modules/access-code/utils/mapValidationTypeToIconName'
import {mapBiometricsAuthenticationTypeToLabel} from '@/modules/access-code/utils/mapValidationTypeToLabel'
import {appInsights} from '@/providers/appinsights.provider'
import {Permissions} from '@/types/permissions'

export const useAccessCodeBiometrics = () => {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const dispatch = useDispatch()
  const {requestPermission} = usePermission(Permissions.biometrics)
  const [isLoading, setIsLoading] = useState(true)
  const useBiometrics = useSelector(selectUseBiometrics)

  const [biometricsAuthenticationType, setBiometricsAuthenticationType] =
    useState<AuthenticationType[]>()

  const biometricsLabel = useMemo(
    () => mapBiometricsAuthenticationTypeToLabel(biometricsAuthenticationType),
    [biometricsAuthenticationType],
  )

  const iconName: SvgIconName | undefined = useMemo(
    () =>
      mapBiometricsAuthenticationTypeToIconName(biometricsAuthenticationType),
    [biometricsAuthenticationType],
  )

  const refreshEnrollment = useCallback(async (): Promise<boolean> => {
    const enrolled = await isEnrolledAsync()

    setIsEnrolled(enrolled)

    return enrolled
  }, [])

  useEffect(() => {
    void refreshEnrollment()
  }, [refreshEnrollment])

  const setUseBiometrics = useCallback(
    (choice: boolean) =>
      dispatch(accessCodeSlice.actions.setUseBiometrics(choice)),
    [dispatch],
  )

  const updateUseBiometrics = useCallback(
    async (shouldUseBiometrics: boolean): Promise<void> => {
      if (!shouldUseBiometrics || !biometricsLabel) {
        setUseBiometrics(false)

        return
      }

      const enrolled = await refreshEnrollment()

      if (!enrolled) {
        setUseBiometrics(false)

        return
      }

      if (
        Platform.OS === 'ios' &&
        biometricsAuthenticationType?.includes(
          AuthenticationType.FACIAL_RECOGNITION,
        )
      ) {
        const granted = await requestPermission()

        setUseBiometrics(granted)

        return
      }

      setUseBiometrics(true)
    },
    [
      biometricsAuthenticationType,
      biometricsLabel,
      refreshEnrollment,
      requestPermission,
      setUseBiometrics,
    ],
  )

  useEffect(() => {
    const fetchBiometricsAuthenticationType = async () => {
      setIsLoading(true)

      try {
        const type = await supportedAuthenticationTypesAsync()

        setBiometricsAuthenticationType(type)
      } catch (err) {
        appInsights.trackException({
          exception: err as Error,
        })
      }

      setIsLoading(false)
    }

    void fetchBiometricsAuthenticationType()
  }, [])

  return {
    biometricsAuthenticationType,
    biometricsLabel,
    isBiometricsSupported: !!biometricsLabel,
    iconName,
    isEnrolled,
    isLoading,
    refreshEnrollment,
    requestPermission,
    setUseBiometrics,
    updateUseBiometrics,
    useBiometrics,
  }
}
