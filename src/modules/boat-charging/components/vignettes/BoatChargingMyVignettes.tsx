import {skipToken} from '@reduxjs/toolkit/query'
import {EmptyList} from '@/components/features/EmptyList'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingMyVignettesLogin} from '@/modules/boat-charging/components/vignettes/BoatChargingMyVignettesLogin'
import {BoatChargingVignetListItem} from '@/modules/boat-charging/components/vignettes/BoatChargingVignetListItem'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'

export const BoatChargingMyVignettes = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()

  const {
    data: vignettes,
    isLoading,
    isError,
  } = useBoatChargingVignettesQuery(isLoggedIn ? undefined : skipToken)

  if (!isLoggedIn) {
    return <BoatChargingMyVignettesLogin />
  }

  if (isLoading) {
    return <PleaseWait testID="BoatChargingMyVignettesPleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="BoatChargingMyVignettesSomethingWentWrong" />
    )
  }

  if (!vignettes?.length) {
    return (
      <>
        <EmptyList
          testID="BoatChargingMyVignettesEmptyList"
          text="Voeg een vignet toe om uw boot te kunnen laden"
          title="Geen vignetten"
        />
        <Button
          icon={{name: 'plus-circle', isFilled: true}}
          label="Vignet toevoegen"
          onPress={() => {
            navigate(BoatChargingRouteName.vignet)
          }}
          testID="BoatChargingMyVignettesEmptyListAddVignetButton"
        />
      </>
    )
  }

  return (
    <Column gutter="md">
      {vignettes.map(vignet => (
        <BoatChargingVignetListItem
          key={vignet.id}
          vignet={vignet}
        />
      ))}
    </Column>
  )
}
