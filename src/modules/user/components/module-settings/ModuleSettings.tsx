import {pascalCase} from 'pascal-case'
import {getVersion} from 'react-native-device-info'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {Column} from '@/components/ui/layout/Column'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useModules} from '@/hooks/useModules'
import {ModuleSetting} from '@/modules/user/components/module-settings/ModuleSetting'

export const ModuleSettings = () => {
  const {modulesError, toggleableModules, modulesLoading, refetchModules} =
    useModules()

  if (modulesLoading) {
    return (
      <PleaseWait
        grow
        testID="UserModuleSettingsLoadingSpinner"
      />
    )
  }

  if (modulesError || !toggleableModules) {
    return (
      <FullScreenError
        buttonAccessibilityLabel="Laad de modules opnieuw"
        buttonLabel="Laad opnieuw"
        error={modulesError}
        Image={ModulesFigure}
        onPress={refetchModules}
        testID="UserModuleSettingsErrorScreen"
        text="Probeer het later opnieuw."
        title="Helaas kunnen de modules niet geladen worden"
      />
    )
  }

  if (!toggleableModules.length) {
    return (
      <Box>
        <EmptyMessage
          testID="UserModuleSettingsEmptyList"
          text={`We hebben geen modules gevonden voor versie ${getVersion()} van de app.`}
        />
      </Box>
    )
  }

  return (
    <Box testID="UserModuleSettings">
      <Column gutter="md">
        <Paragraph>Kies de onderwerpen die u wilt zien.</Paragraph>
        <Column gutter="sm">
          {toggleableModules.map(module => (
            <ModuleSetting
              key={module.slug}
              module={module}
              testID={`UserModuleSettings${pascalCase(module.slug)}Card`}
            />
          ))}
        </Column>
      </Column>
    </Box>
  )
}
