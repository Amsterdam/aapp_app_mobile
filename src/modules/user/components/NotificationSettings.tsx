import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useModules} from '@/hooks/useModules'
import {setLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {Module} from '@/modules/types'
import {NotificationSetting} from '@/modules/user/components/NotificationSetting'
import {
  useGetDisabledPushModulesQuery,
  useGetNotificationModulesQuery,
} from '@/modules/user/service'
import {NotificationModule} from '@/modules/user/types'

const settingsInModuleModuleSlugs = new Set([
  ModuleSlug['burning-guide'],
  ModuleSlug['waste-guide'],
])

export const NotificationSettings = () => {
  const {data: notificationModules, isLoading: isLoadingModules} =
    useGetNotificationModulesQuery()
  const {data: disabledPushModules, isLoading: isLoadingDisabledPushModules} =
    useGetDisabledPushModulesQuery()

  const {enabledModules} = useModules()
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  if (isLoadingModules || isLoadingDisabledPushModules) {
    return <PleaseWait testID="NotificationSettingsPleaseWait" />
  }

  if (!notificationModules || !disabledPushModules) {
    return (
      <SomethingWentWrong testID="NotificationSettingsSomethingWentWrong" />
    )
  }

  const activeModules = (enabledModules
    ?.map<NotificationModule & Partial<Module>>(enabledModule => {
      const slug = enabledModule.moduleSlug
      const notificationModule: Partial<Module> =
        notificationModules?.find(({module}) => module === slug) ?? {}

      return {
        ...enabledModule,
        ...notificationModule,
      } as NotificationModule & Partial<Module>
    })
    .filter(module => !!module.module) ?? []) as Array<
    NotificationModule & Module
  >

  const activeModulesWithSettingsHere = activeModules.filter(
    ({slug}) => !settingsInModuleModuleSlugs.has(slug),
  )
  const activeModulesWithSettingsInModule = activeModules.filter(({slug}) =>
    settingsInModuleModuleSlugs.has(slug),
  )

  return (
    <Column gutter="lg">
      {activeModules.length ? (
        <>
          {activeModulesWithSettingsHere.map(notificationModule => (
            <NotificationSetting
              isDisabled={disabledPushModules.includes(
                notificationModule.module,
              )}
              key={notificationModule.module}
              notificationModule={notificationModule}
            />
          ))}

          <Column gutter="no">
            {activeModulesWithSettingsInModule.length > 0 && (
              <Box>
                <Title
                  level="h5"
                  text="Instellen in onderdelen"
                />
              </Box>
            )}
            <Column gutter="xxs">
              {activeModulesWithSettingsInModule.map(({title, slug}) => (
                <NavigationButton
                  chevronSize="md"
                  emphasis="default"
                  key={slug}
                  onPress={() => {
                    dispatch(
                      setLocationType({
                        locationType: 'address',
                        moduleSlug: slug,
                      }),
                    )
                    navigate(slug)
                  }}
                  testID={`UserNotificationSettings${slug}NavigationButton`}
                  title={title}
                />
              ))}
            </Column>
          </Column>
        </>
      ) : (
        <Phrase>
          Er zijn momenteel geen onderwerpen om pushmeldingen van te ontvangen.
        </Phrase>
      )}
    </Column>
  )
}
