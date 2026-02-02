import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const WasteGuideNotFound = () => {
  const navigation = useNavigation<WasteGuideRouteName>()

  return (
    <Column gutter="lg">
      <Column gutter="sm">
        <Title
          testID="BurningGuideAddressOutsideAmsterdamTitle"
          text="Afvalinformatie"
        />
        <Phrase>We hebben geen informatie gevonden bij dit adres.</Phrase>
      </Column>
      <Button
        label="Dit klopt niet"
        onPress={() =>
          navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
        }
        testID="WasteGuideNotFoundMistakeButton"
        variant="secondary"
      />
    </Column>
  )
}
