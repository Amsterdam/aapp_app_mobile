import {useCallback} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingVignetForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetForm'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BaseVignet} from '@/modules/boat-charging/types'

type Props = NavigationProps<BoatChargingRouteName.verifyVignet>

export const BoatChargingVerifyVignetScreen = ({navigation, route}: Props) => {
  const {
    onPress,
    form: {getValues, setValue},
  } = useInitSession(BoatChargingRouteName.verifyVignet)

  const onReset = useCallback(
    () => navigation.setParams({resetFormOnFocus: undefined}),
    [navigation],
  )

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
        <BoatChargingVignetForm
          onReset={onReset}
          onVerified={onVerified}
          resetOnFocus={route.params?.resetFormOnFocus}
        />
      </Box>
    </Screen>
  )
}
