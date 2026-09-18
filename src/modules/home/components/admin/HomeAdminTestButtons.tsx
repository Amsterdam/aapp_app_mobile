import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {useAllModulesLogout} from '@/modules/user/hooks/useAllModulesLogout'
import {devError, devLog} from '@/processes/development'

export const HomeAdminTestButtons = () => {
  const {navigate, goBack} = useNavigation()
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow('admin')
  const logoutOfAllModules = useAllModulesLogout()

  const onPressLogout = useCallback(() => {
    void logoutOfAllModules()
      .then(response => {
        devLog(response)
        goBack()
      })
      .catch(devError)
  }, [logoutOfAllModules, goBack])

  return (
    <Column gutter="md">
      <Button
        label="Volledige logout"
        onPress={onPressLogout}
        testID="AdminScreenFullLogoutButton"
        variant="secondaryDestructive"
      />
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
