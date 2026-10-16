import {skipToken} from '@reduxjs/toolkit/query'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'

export const BoatChargingAddVignetHeaderButton = () => {
  const {navigate} = useNavigation()
  const {isLoggedIn} = useIsLoggedIn()

  const {isLoading} = useBoatChargingVignettesQuery(
    isLoggedIn ? undefined : skipToken,
  )

  if (!isLoggedIn) {
    return null
  }

  return (
    <IconButton
      accessibilityLabel="Voeg een vignet toe"
      disabled={isLoading}
      icon={
        <Icon
          color="link"
          isFilled
          name="plus-circle"
          size="lgx"
          testID="BoatChargingAddVignetHeaderButtonIcon"
        />
      }
      onPress={() => {
        navigate(BoatChargingRouteName.vignet)
      }}
      testID="BoatChargingAddVignetHeaderButton"
    />
  )
}
