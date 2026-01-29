import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {getGroupedOpeningHours} from '@/modules/contact/utils/getGroupedOpeningHours'
import {WasteGuideRecyclePointTopTaskButton} from '@/modules/waste-guide/components/recyclepoints/WasteGuideRecyclePointTopTaskButton'
import {useGetActiveRecyclePoint} from '@/modules/waste-guide/hooks/useGetActiveRecyclePoint'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const WasteGuideRecyclePoint = () => {
  const {navigate} = useNavigation()
  const {activeRecyclePoint, isLoading} = useGetActiveRecyclePoint()

  if (isLoading) {
    return <PleaseWait testID="WasteGuideRecyclePointsPleaseWait" />
  }

  if (!activeRecyclePoint) {
    return (
      <SomethingWentWrong testID="WasteGuideRecyclePointsSomethingWentWrong" />
    )
  }

  const {openingHours} = activeRecyclePoint

  return (
    <Column gutter="lg">
      <WasteGuideRecyclePointTopTaskButton recyclePoint={activeRecyclePoint} />
      {openingHours.regular.length > 0 && (
        <Column gutter="md">
          <Title
            level="h4"
            testID="WasteGuideRecyclePointsOpeningHoursTitle"
            text="Openingstijden"
          />
          <List
            items={getGroupedOpeningHours(openingHours.regular)}
            testID="WasteGuideRecyclePointsVisitingHoursList"
          />
        </Column>
      )}
      <Button
        label="Bekijk op de kaart"
        onPress={() => {
          navigate(WasteGuideRouteName.wasteGuideRecyclePointMap)
        }}
        testID="WasteGuideRecyclePointsSeeMapButton"
        variant="secondary"
      />
    </Column>
  )
}
