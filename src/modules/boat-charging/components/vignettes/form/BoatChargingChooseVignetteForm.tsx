import {useMemo, type ComponentProps} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'

export const BoatChargingChooseVignetteForm = () => {
  const navigation = useNavigation()
  const {
    data: vignettes = [],
    isLoading,
    isError,
  } = useBoatChargingVignettesQuery()
  const {form} = useInitSession(BoatChargingRouteName.chooseVignette)

  const options: ComponentProps<typeof RadioGroupControlled>['options'] =
    useMemo(
      () =>
        vignettes.map(vignette => ({
          label: (
            <Phrase key={vignette.id}>
              {[vignette.vignette_number, vignette.boat_name]
                .filter(Boolean)
                .join(' - ')}
            </Phrase>
          ),

          value: vignette,
        })),
      [vignettes],
    )

  useFocusAndForegroundEffect(() => {
    if (!isLoading && !isError && vignettes && !vignettes.length) {
      /**
       * When a user does not have vignettes connected to their account and they arrive on this route
       * from the pendingScreen set in @see BoatChargingGuestEmailForm we forward and replace to verifyVignette screen.
       * */
      navigation.replace(BoatChargingRouteName.verifyVignette)
    }
  }, [isLoading, isError, vignettes, navigation])

  if (isLoading) {
    return <PleaseWait testID="BoatChargingChooseVignetteFormPleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="BoatChargingChooseVignetteFormSomethingWentWrong" />
    )
  }

  return (
    <Column gutter="lg">
      <RadioGroupControlled
        {...form}
        label="Met welk vignet wilt u laden?"
        name="vignette"
        options={options}
        rules={{required: true}}
        testID="BoatChargingDetailsChooseVignetteRadioGroup"
      />
      <NavigationButton
        chevronSize="ml"
        emphasis="default"
        horizontallyAlign="start"
        insetHorizontal="no"
        onPress={() => {
          form.setValue('vignette', null)
          navigation.navigate(BoatChargingRouteName.verifyVignette)
        }}
        testID="BoatChargingChooseVignetteFormVerifyVignetteNavigationButton"
        title="Ander vignet invullen"
      />
    </Column>
  )
}
