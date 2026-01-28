import {pascalCase} from 'pascal-case'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {ModuleButton} from '@/modules/home/components/ModuleButton'
import {ModuleStatus, type Module} from '@/modules/types'

type Props = {
  modules: Module[]
}

export const Modules = ({modules}: Props) => {
  const availableModules = modules?.filter(m => !m.hiddenInMenu)

  if (!modules.length) {
    return (
      <Box>
        <EmptyMessage
          testID="HomeModulesEmptyList"
          text="Alle modules staan uit. Daardoor is hier niet veel te doen. Zet één of meer modules aan via de instellingen rechtsboven."
        />
      </Box>
    )
  }

  return (
    <Column gutter="sm">
      {availableModules?.map(
        ({icon, requiresAuthorization, slug, status, title}) => (
          <ModuleButton
            disabled={status === ModuleStatus.inactive}
            iconName={icon}
            key={slug}
            label={title}
            slug={slug}
            testID={`Home${pascalCase(slug)}Module`}
            variant={requiresAuthorization ? 'primary' : 'tertiary'}
          />
        ),
      )}
    </Column>
  )
}
