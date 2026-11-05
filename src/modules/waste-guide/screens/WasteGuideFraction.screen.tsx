import {useEffect, useLayoutEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Survey} from '@/modules/survey/exports/Survey'
import {Fraction} from '@/modules/waste-guide/components/Fraction'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = NavigationProps<WasteGuideRouteName.wasteGuideFraction>

export const WasteGuideFractionScreen = ({navigation, route}: Props) => {
  const {fractionCode} = route.params
  const {wasteGuide, hasValidAddress, isLoading} = useGetWasteGuide()

  useEffect(() => {
    if (!hasValidAddress) {
      navigation.replace(WasteGuideRouteName.wasteGuide)
    }
  }, [hasValidAddress, navigation])

  const fraction = wasteGuide?.waste_types.find(
    wasteType => wasteType.code.toLowerCase() === fractionCode.toLowerCase(),
  )

  useLayoutEffect(() => {
    if (!wasteGuide) {
      return
    }

    if (!fraction) {
      navigation.replace(WasteGuideRouteName.wasteGuide)
    } else {
      navigation.setOptions({
        headerTitle: fraction.label,
      })
    }
  }, [fraction, wasteGuide, navigation])

  if (isLoading) {
    return <PleaseWait testID="WasteGuideFractionScreenPleaseWait" />
  }

  if (!fraction) {
    return null
  }

  return (
    <Screen
      keyboardAware
      testID="WasteGuideFractionScreen">
      <Column gutter="lg">
        <Box>
          <Fraction
            fraction={fraction}
            testID="WasteGuideFraction"
          />
        </Box>
        <Survey entryPoint="waste-guide-fraction-info" />
      </Column>
    </Screen>
  )
}
