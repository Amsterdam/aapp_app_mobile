import {View} from 'react-native'
import {Phrase} from '@/components/ui/text/Phrase'
import {Emphasis} from '@/themes/tokens/text'

type Props = {
  emphasis?: keyof typeof Emphasis
  isAccessible?: boolean
  isLabelDescription?: boolean
  required?: boolean
  text: string
}

export const Label = ({
  isAccessible,
  isLabelDescription,
  text,
  emphasis = 'strong',
  required,
}: Props) => (
  <View
    accessibilityElementsHidden={!isAccessible} // in case of iOS
    accessibilityLanguage="nl-NL"
    importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
  >
    <Phrase
      emphasis={emphasis}
      testID="TextInputLabel">
      {text}
      <Phrase>
        {!required && !isLabelDescription ? ' (Niet verplicht)' : ''}
      </Phrase>
    </Phrase>
  </View>
)
