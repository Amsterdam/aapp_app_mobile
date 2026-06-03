import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NewsRouteName} from '@/modules/news/routes'

export const NewsHighlightsNavigationButton = () => {
  const {navigate} = useNavigation()

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="ml"
      color="default"
      horizontallyAlign="start"
      insetHorizontal="no"
      onPress={() => navigate(NewsRouteName.highlights)}
      testID="NewsHighlightsNavigationButton"
      title="Uitgelicht"
      titleLevel="h3"
    />
  )
}
