import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'

export const WasteGuideMoreOptions = () => {
  const {navigate} = useNavigation()

  return (
    <HorizontalSafeArea flex={1}>
      <Box
        grow
        insetHorizontal="md"
        insetVertical="no">
        <Column gutter="md">
          <Title
            level="h2"
            text="Meer opties"
          />
          <NavigationButton
            Icon={
              <Icon
                color="link"
                name="alert"
                size="xl"
              />
            }
            insetHorizontal="sm"
            onPress={() =>
              navigate(ModuleSlug['report-problem'], {
                screen: ReportProblemRouteName.reportProblemWebView,
              })
            }
            testID="WasteGuideMoreOptionsButton"
            title="Meld een afvalprobleem"
          />
        </Column>
      </Box>
    </HorizontalSafeArea>
  )
}
