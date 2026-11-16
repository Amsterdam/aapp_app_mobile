import {useCallback} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetteForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteForm'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BaseVignette} from '@/modules/boat-charging/types'

type Props = NavigationProps<BoatChargingRouteName.verifyVignette>

export const BoatChargingVerifyVignetteScreen = ({
  navigation,
  route,
}: Props) => {
  const {
    onPress,
    form: {getValues, setValue},
  } = useInitSession(BoatChargingRouteName.verifyVignette)

  const onReset = useCallback(
    () => navigation.setParams({resetFormOnFocus: undefined}),
    [navigation],
  )

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
        <BoatChargingVignetteForm
          onReset={onReset}
          onVerified={onVerified}
          resetOnFocus={route.params?.resetFormOnFocus}
        />
      </Box>
    </Screen>
  )
}
