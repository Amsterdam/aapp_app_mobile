import {useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetteForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetForm'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BaseVignette} from '@/modules/boat-charging/types'

export const BoatChargingVerifyVignetteScreen = () => {
  const {
    onPress,
    form: {getValues, setValue},
  } = useInitSession(BoatChargingRouteName.verifyVignette)

  const onVerified = useCallback(
    (vignette: BaseVignette) => {
      const verifiedVignette = {...vignette, verified: true}

      setValue('vignette', verifiedVignette)
      void onPress({...getValues(), vignette: verifiedVignette})
    },
    [onPress, getValues, setValue],
  )

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      scroll
      testID="BoatChargingVerifyVignetteScreen">
      <Box grow>
        <BoatChargingVignetteForm onVerified={onVerified} />
      </Box>
    </Screen>
  )
}
