import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NeighborhoodRouteName} from '@/modules/neighborhood/routes'

export const NeighborhoodBoardHeaderButton = () => {
  const navigation = useNavigation()

  return (
    <IconButton
      accessibilityLabel="Maak nieuw briefje aan"
      icon={
        <Icon
          color="link"
          name="plus"
          size="lg"
        />
      }
      onPress={() =>
        navigation.navigate(NeighborhoodRouteName.addBoardItemImage)
      }
      testID="NeighborhoodBoardHeaderButton"
    />
  )
}
