import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ServiceRouteName} from '@/modules/service/routes'
import type {WasteType} from '@/modules/waste-guide/types'

export const FractionMapNavigationButton = ({
  service_map_id,
  label,
  code,
}: Pick<WasteType, 'service_map_id' | 'label' | 'code'>) => {
  const navigation = useNavigation()

  return (
    <NavigationButton
      chevronSize="md"
      emphasis="default"
      horizontallyAlign="start"
      insetHorizontal="no"
      insetVertical="no"
      onPress={() =>
        navigation.navigate(ModuleSlug.service, {
          screen: ServiceRouteName.map,
          params: {id: service_map_id, title: label},
        })
      }
      testID={`WasteGuideFraction${code}MapNavigationButton`}
      title="Kaart met inleverplekken in de buurt"
    />
  )
}
