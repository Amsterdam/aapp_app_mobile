import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'

export const BurningGuideReportButton = () => {
  const {navigate} = useNavigation()

  return (
    <TopTaskButton
      icon={{name: 'warning'}}
      isInternalLink
      onPress={() => navigate(BurningGuideRouteName.burningGuideNuisance)}
      testID="BurningGuideReportButton"
      text="Heeft u last van rook?"
      title="Overlast melden"
    />
  )
}
