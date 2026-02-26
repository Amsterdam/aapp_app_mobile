import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/slugs'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'

export const HomeAdminTestButtons = () => {
  const {navigate} = useNavigation()
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow('admin')

  return (
    <Column gutter="md">
      <Button
        label="Toon onboarding"
        onPress={() => navigate(ModuleSlug.onboarding)}
        testID="AdminScreenShowOnboardingButton"
      />
      <Button
        label="Toon actieformulier"
        onPress={() => openSurveyBottomsheet()}
        testID="AdminScreenShowSurveyButton"
      />
    </Column>
  )
}
