import {useEffect, useLayoutEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Survey} from '@/modules/survey/exports/Survey'
import {Fraction} from '@/modules/waste-guide/components/Fraction'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = NavigationProps<WasteGuideRouteName.wasteGuideFraction>

export const WasteGuideFractionScreen = ({navigation, route}: Props) => {
  const {fractionCode} = route.params
  const {wasteGuide, hasValidAddress} = useGetWasteGuide()

  useEffect(() => {
    if (!hasValidAddress) {
      navigation.replace(WasteGuideRouteName.wasteGuide)
    }
  }, [hasValidAddress, navigation])

  const fraction = wasteGuide?.waste_types.find(
    wasteType => wasteType.code === fractionCode,
  )

  useLayoutEffect(() => {
    if (!fraction) {
      return
    }

    navigation.setOptions({
      headerTitle: fraction.label,
    })
  }, [fraction, navigation])

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
