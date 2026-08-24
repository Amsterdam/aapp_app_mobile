import {pascalCase} from 'pascal-case'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useModules} from '@/hooks/useModules'
import {ModuleButton} from '@/modules/home/components/ModuleButton'
import {ModuleStatus} from '@/modules/types'

export const Modules = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()

  if (modulesLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="HomeModulesLoadingSpinner"
      />
    )
  }

  if (modulesError || !enabledModules) {
    return (
      <Column gutter="lg">
        <Box>
          <Column gutter="md">
            <Title
              level="h3"
              testID="ModulesErrorTitle"
              text="We kunnen de onderwerpen niet laden"
              textAlign="center"
            />
            <Paragraph textAlign="center">
              Controleer uw internetverbinding of probeer het later opnieuw
            </Paragraph>
          </Column>
        </Box>
        <Button
          accessibilityLabel="Laad de onderwerpen opnieuw"
          label="Opnieuw laden"
          onPress={refetchModules}
          testID="HomeModulesErrorButton"
          variant="secondary"
        />
      </Column>
    )
  }

  if (!enabledModules.length) {
    return (
      <Box>
        <EmptyMessage
          testID="HomeModulesEmptyList"
          text="Alle onderwerpen staan uit. Daardoor is hier niet veel te doen. Zet één of meer onderwerpen aan via de instellingen rechtsboven."
        />
      </Box>
    )
  }

  const availableModules = enabledModules?.filter(m => !m.excludeFromHome)

  return (
    <Column gutter="sm">
      {availableModules?.map(
        ({
          iconPath,
          requiresAuthorization,
          slug,
          status,
          title,
          moduleHighlightColor,
          moduleTitleColor,
        }) => (
          <ModuleButton
            background={moduleHighlightColor}
            disabled={status === ModuleStatus.inactive}
            iconPath={iconPath}
            key={slug}
            label={title}
            slug={slug}
            testID={`Home${pascalCase(slug)}Module`}
            titleColor={moduleTitleColor}
            variant={requiresAuthorization ? 'primary' : 'tertiary'}
          />
        ),
      )}
    </Column>
  )
}
