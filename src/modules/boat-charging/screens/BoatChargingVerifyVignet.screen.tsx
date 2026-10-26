import {useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetForm'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import type {BaseVignet} from '@/modules/boat-charging/types'

export const BoatChargingVerifyVignetScreen = () => {
  const {
    onPress,
    form: {getValues, setValue},
  } = useInitSession(BoatChargingInitSessionStep.verifyVignet)

  const onVerified = useCallback(
    (vignet: BaseVignet) => {
      const verifiedVignet = {...vignet, verified: true}

      setValue('vignet', verifiedVignet)
      void onPress({...getValues(), vignet: verifiedVignet})
    },
    [onPress, getValues, setValue],
  )

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      scroll
      testID="BoatChargingVerifyVignetScreen">
      <Box grow>
        <BoatChargingVignetForm onVerified={onVerified} />
      </Box>
    </Screen>
  )
}
