import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {useGuestSessionFormValues} from '@/modules/boat-charging/slice'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingTermsAndConditions>

export const BoatChargingTermsAndConditionsScreen = ({navigation}: Props) => {
  const {resetForm} = useGuestSessionFormValues()

  return (
    <Screen testID="BoatChargingTermsAndConditionsScreen">
      <Box grow>
        <Title text="Voorwaarden" />
        <Button
          icon={{name: 'boat-charging-free', color: 'inverse'}}
          label="Betalen en laden"
          marginTop="auto"
          onPress={() => {
            resetForm()
            navigation.popToTop()
          }}
          testID="BoatChargingTermsAndConditionsScreenSubmitButton"
        />
      </Box>
    </Screen>
  )
}
