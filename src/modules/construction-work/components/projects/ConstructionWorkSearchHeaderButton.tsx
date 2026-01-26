import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const ConstructionWorkSearchHeaderButton = () => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  return (
    <IconButton
      accessibilityLabel="Zoek in werkzaamheden"
      icon={
        <Icon
          color="link"
          name="search"
          size="ml"
          testID="ConstructionWorkSearchHeaderButtonIcon"
        />
      }
      onPress={() => navigation.navigate(ConstructionWorkRouteName.search)}
      testID="ConstructionWorkSearchHeaderButton"
    />
  )
}
