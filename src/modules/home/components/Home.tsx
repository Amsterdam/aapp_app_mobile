import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {useModules} from '@/hooks/useModules'
import {ActionButtons} from '@/modules/home/components/ActionButtons'
import {Modules} from '@/modules/home/components/Modules'

export const Home = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()

  if (modulesLoading) {
    return <PleaseWait testID="HomeLoadingSpinner" />
  }

  if (modulesError || !enabledModules) {
    return (
      <FullScreenError
        buttonAccessibilityLabel="Laad de modules opnieuw"
        buttonLabel="Laad opnieuw"
        error={modulesError}
        Image={ModulesFigure}
        onPress={refetchModules}
        testID="HomeErrorScreen"
        text="Probeer het later opnieuw."
        title="Helaas kunnen de modules niet geladen worden"
      />
    )
  }

  return (
    <Box grow>
      <ActionButtons />
      <Modules modules={enabledModules} />
    </Box>
  )
}
