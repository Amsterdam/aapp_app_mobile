import {ActionButton as ActionButtonBase} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {parkingModule} from '@/modules/parking'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, PermitType} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'
import {useGetCachedServerModule} from '@/store/slices/modules'

const ALLOWED_PERMIT_TYPES = new Set([
  PermitType.kraskaartvergunning,
  PermitType.bezoekersvergunning,
  PermitType['GA-bezoekerskaart'],
])

export const ActionButton = () => {
  const {navigate} = useNavigation()

  const {accessCode} = useGetSecureAccessCode()
  const {isLoginStepsActive} = useLoginSteps()
  const parkingAccount = useParkingAccount()
  const {isInactive} = useGetCachedServerModule(parkingModule.slug)

  const isAllowedPermit =
    parkingAccount?.permits?.length === 1 &&
    ALLOWED_PERMIT_TYPES.has(parkingAccount.permits[0].permit_type) &&
    parkingAccount.scope === ParkingPermitScope.permitHolder

  if (!accessCode || isLoginStepsActive || !isAllowedPermit) {
    return null
  }

  return (
    <Column>
      <ActionButtonBase
        icon={{name: 'parking-start'}}
        isModuleInactive={isInactive}
        label={'Parkeersessie\nstarten'}
        onPress={() => {
          navigate(ModuleSlug.parking, {
            screen: ParkingRouteName.startSession,
          })
        }}
        testID="ParkingActionButton"
      />
      <Gutter height="lg" />
    </Column>
  )
}
