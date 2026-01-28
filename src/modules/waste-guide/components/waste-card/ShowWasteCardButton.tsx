import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/slugs'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'

export const ShowWasteCardButton = () => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="afvalpas"
      label="Afvalpas tonen"
      onPress={() =>
        navigate(ModuleSlug['waste-container'], {
          screen: WasteContainerRouteName.wasteCard,
        })
      }
      testID="WasteGuideShowWasteCardButton"
      variant="secondary"
    />
  )
}
