import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const WasteGuideMoreOptions = () => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="md">
      <Title text="Meer opties" />
      <NavigationButton
        Icon={
          <Icon
            color="link"
            name="warning"
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
      <NavigationButton
        Icon={
          <Icon
            color="link"
            name="recycle"
            size="xl"
          />
        }
        insetHorizontal="sm"
        onPress={() => navigate(WasteGuideRouteName.wasteGuideRecyclePoints)}
        testID="WasteGuideRecyclingNavigationButton"
        title="Recyclepunten"
      />
    </Column>
  )
}
