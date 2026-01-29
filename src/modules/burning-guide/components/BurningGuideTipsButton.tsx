import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'

export const BurningGuideTipsButton = () => {
  const {navigate} = useNavigation()

  return (
    <TopTaskButton
      icon={{name: 'lightBulb'}}
      isInternalLink
      onPress={() => navigate(BurningGuideRouteName.burningGuideTips)}
      testID="BurningGuideTipsButton"
      text="Wilt u toch stoken? Doe het dan zo schoon mogelijk. Lees de tips over slim stoken."
      title="Slim stoken"
    />
  )
}
