import {useMemo, type ComponentProps} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'

export const BoatChargingChooseVignetForm = () => {
  const navigation = useNavigation()
  const {
    data: vignettes = [],
    isLoading,
    isError,
  } = useBoatChargingVignettesQuery()
  const {form} = useInitSession(BoatChargingInitSessionStep.chooseVignet)

  const options: ComponentProps<typeof RadioGroupControlled>['options'] =
    useMemo(
      () =>
        vignettes.map(vignet => ({
          label: (
            <Phrase key={vignet.id}>
              {[vignet.vignette_number, vignet.boat_name]
                .filter(Boolean)
                .join(' - ')}
            </Phrase>
          ),

          value: vignet,
        })),
      [vignettes],
    )

  useFocusAndForegroundEffect(() => {
    if (!isLoading && !isError && vignettes && !vignettes.length) {
      /**
       * When a user does not have vignettes connected to their account and they arrive on this route
       * from the pendingScreen set in @see BoatChargingGuestEmailForm we forward and replace to verifyVignet screen.
       * */
      navigation.replace(BoatChargingRouteName.verifyVignet)
    }
  }, [isLoading, isError, vignettes, navigation])

  if (isLoading) {
    return <PleaseWait testID="BoatChargingChooseVignetFormPleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="BoatChargingChooseVignetFormSomethingWentWrong" />
    )
  }

  return (
    <Column gutter="lg">
      <RadioGroupControlled
        {...form}
        label="Met welk vignet wilt u laden?"
        name="vignet"
        options={options}
        rules={{required: true}}
        testID="BoatChargingDetailsChooseSocketRadioGroup"
      />
      <NavigationButton
        chevronSize="ml"
        emphasis="default"
        horizontallyAlign="start"
        insetHorizontal="no"
        onPress={() => {
          form.setValue('vignet', null)
          navigation.navigate(BoatChargingRouteName.verifyVignet)
        }}
        testID="BoatChargingChooseVignetFormVerifyVignetNavigationButton"
        title="Ander vignet invullen"
      />
    </Column>
  )
}
