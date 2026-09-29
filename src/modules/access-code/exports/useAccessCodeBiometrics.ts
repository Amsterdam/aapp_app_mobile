import {
  AuthenticationType,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import {useState, useEffect, useCallback, useMemo} from 'react'
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

  useEffect(() => {
    void isEnrolledAsync().then(setIsEnrolled)
  }, [])

  const setUseBiometrics = useCallback(
    (choice: boolean) =>
      dispatch(accessCodeSlice.actions.setUseBiometrics(choice)),
    [dispatch],
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
    iconName,
    isEnrolled,
    isLoading,
    requestPermission,
    setUseBiometrics,
    useBiometrics,
  }
}
