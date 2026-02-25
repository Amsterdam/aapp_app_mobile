import {ITelemetryItem} from '@microsoft/applicationinsights-web'
import {useEffect} from 'react'
import {Platform} from 'react-native'
import {isEmulator as isEmulatorDeviceInfo} from 'react-native-device-info'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useSelector} from '@/hooks/redux/useSelector'
import {obfuscateQueryParams} from '@/processes/logging/utils/obfuscateQueryParams'
import {useAppInsights} from '@/providers/appinsights.provider'
import {selectEnvironment} from '@/store/slices/environment'
import {selectPermissions} from '@/store/slices/permissions'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export const useAddTelemetryInitializer = () => {
  const appInsights = useAppInsights()
  const {environment} = useSelector(selectEnvironment)
  const permissions = useSelector(selectPermissions)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  useEffect(() => {
    const permissionsGranted = Object.entries(permissions).reduce(
      (acc, [key, value]) => {
        acc[key] = value.granted

        return acc
      },
      {} as Record<string, boolean>,
    )

    void Promise.all([isEmulatorDeviceInfo()]).then(([isEmulator]) => {
      const telemetryInitializer = (envelope: ITelemetryItem) => {
        envelope.data ??= {}

        envelope.data.appVersion = VERSION_NUMBER_WITH_BUILD
        envelope.data.deviceId = SHA256EncryptedDeviceId
        envelope.data.isEmulator = isEmulator
        envelope.data.os = Platform.OS
        envelope.data.osVersion = Platform.Version
        envelope.data.environment = environment
        envelope.data.permissions = permissionsGranted
        envelope.data.isScreenReaderEnabled = isScreenReaderEnabled
      }

      appInsights.addTelemetryInitializer(telemetryInitializer)
      appInsights.addDependencyInitializer(details => {
        details.item.name = obfuscateQueryParams(details.item.name)
      })
    })
  }, [appInsights, environment, isScreenReaderEnabled, permissions])
}
