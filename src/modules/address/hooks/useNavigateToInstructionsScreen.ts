import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeModalName} from '@/modules/home/routes'
import {
  IconComponentName,
  PermissionInstructionScreenParams,
} from '@/modules/home/types'
import {Permissions} from '@/types/permissions'

const navigationParams: Record<
  Permissions[number],
  PermissionInstructionScreenParams
> = {
  [Permissions.biometrics]: {
    iconName: 'face-id',
    paragraph: 'Ga naar Instellingen en geef de app toegang tot Face ID.',
    permission: Permissions.biometrics,
    screenTitle: 'Face ID',
    title: 'Geef toegang tot Face ID',
  },
  [Permissions.bluetooth]: {
    iconComponentName: IconComponentName.bluetooth,
    paragraph: 'Ga naar Instellingen en geef de app toegang tot bluetooth.',
    permission: Permissions.bluetooth,
    screenTitle: 'Bluetooth delen',
    title: 'Geef toegang tot bluetooth',
  },
  [Permissions.location]: {
    iconName: 'location',
    paragraph: 'Ga naar Instellingen en geef de app toegang tot uw locatie.',
    permission: Permissions.location,
    screenTitle: 'Locatie delen',
    title: 'Geef uw locatie door',
  },
  [Permissions.notifications]: {
    iconName: 'bellOff',
    paragraph: 'Ga naar Instellingen en zet de meldingen aan.',
    permission: Permissions.notifications,
    screenTitle: 'Pushmeldingen',
    title: 'U ontvangt geen pushmeldingen',
  },
}

export const useNavigateToInstructionsScreen = (permission: Permissions) => {
  const {navigate} = useNavigation<HomeModalName>()

  return useCallback(
    () =>
      navigate(
        HomeModalName.permissionInstructions,
        navigationParams[permission],
      ),
    [navigate, permission],
  )
}
