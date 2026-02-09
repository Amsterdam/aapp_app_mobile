import {useCallback} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {StatefulTopTaskButton} from '@/components/ui/buttons/StatefulTopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {useLocation} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {type LogProps} from '@/processes/piwik/types'
import {Permissions} from '@/types/permissions'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  moduleSlug: ModuleSlug
} & TestProps &
  LogProps

const getText = (
  loading: boolean,
  hasPermission: boolean,
  addressLine1?: string,
) => {
  if (loading) {
    return '...'
  }

  if (addressLine1 && hasPermission) {
    return `In de buurt van ${addressLine1}`
  }

  return 'Geef uw locatie door'
}

export const LocationTopTaskButton = ({
  highAccuracyPurposeKey,
  moduleSlug,
  testID,
  ...props
}: Props) => {
  const {hasPermission} = usePermission(Permissions.location)
  const {isGettingLocation, getLocationIsError, location} = useLocation()
  const {goBack} = useNavigation()
  const setLocationType = useSetLocationType(moduleSlug)

  const {requestPermission} = usePermission(Permissions.location)
  const {startLocationFetch} = useRequestLocationFetch(
    moduleSlug,
    highAccuracyPurposeKey,
  )

  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )

  const onPressLocationButton = useCallback(async () => {
    const permission = await requestPermission()

    startLocationFetch()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')

    goBack()
  }, [
    goBack,
    startLocationFetch,
    navigateToInstructionsScreen,
    requestPermission,
    setLocationType,
  ])

  return (
    <StatefulTopTaskButton
      icon={{name: 'gps-ios', size: 'lgx'}}
      insetHorizontal="sm"
      isError={getLocationIsError}
      isLoading={isGettingLocation}
      logName={`${testID}${hasPermission && location ? 'SelectLocation' : 'AddLocation'}`}
      onPress={onPressLocationButton}
      testID={testID}
      text={getText(!!isGettingLocation, hasPermission, location?.addressLine1)}
      title="Mijn huidige locatie"
      {...props}
    />
  )
}
