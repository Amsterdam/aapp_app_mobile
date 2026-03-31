import notifee, {AndroidImportance} from '@notifee/react-native'
import {startLiveUpdate} from 'modules/react-native-live-updates/src'
import {useEffect} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useModules} from '@/hooks/useModules'
import {ActionButtons} from '@/modules/home/components/ActionButtons'
import {Modules} from '@/modules/home/components/Modules'
import {devLog} from '@/processes/development'
import {Permissions} from '@/types/permissions'

export const Home = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()

  const {hasPermission, requestPermission} = usePermission(
    Permissions.notifications,
  )

  useEffect(() => {
    if (!hasPermission) {
      void requestPermission()
    } else {
      notifee
        .createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        })
        .then(channel => {
          startLiveUpdate(
            {
              title: 'Zwemactiviteit is bezig!',
              text: 'Verwachtte eindtijd over 10 minuten',
              subText: 'Ticketnr. #1234',
              image: {
                url: 'https://png.pngtree.com/png-clipart/20240108/original/pngtree-flat-cartoon-asian-games-sports-character-a-man-swimming-png-image_14051160.png',
                isRemote: true,
              },
              icon: {
                url: 'https://www.vhv.rs/dpng/d/549-5493305_home-delivery-bike-logo-png-transparent-png.png',
                isRemote: true,
              },
              shortCriticalText: '10 min',
              progress: {
                max: 100,
                progress: 70,
                indeterminate: false,
                points: [
                  {position: 50, color: '#AF0000'},
                  {position: 30, color: '#ef09e3'},
                ],
                segments: [
                  {length: 70, color: '#0fc0d0'},
                  {length: 30, color: '#CCCCCC'},
                ],
              },
              showTime: true,
              time: Date.now(),
            },
            {channelId: channel},
          )
        })
        .catch(e => {
          devLog(e)
        })
    }
  }, [hasPermission, requestPermission])

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
    <Box>
      <ActionButtons />
      <Modules modules={enabledModules} />
    </Box>
  )
}
