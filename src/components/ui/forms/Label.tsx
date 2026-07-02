import {View} from 'react-native'
import type {Emphasis} from '@/themes/tokens/text'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  emphasis?: Emphasis
  isAccessible?: boolean
  required?: boolean
  shouldShowSuffix?: boolean
  text: string
}

export const Label = ({
  isAccessible,
  shouldShowSuffix = true,
  text,
  emphasis = 'strong',
  required,
}: Props) => {
  const suffix = !required && shouldShowSuffix ? ' (Niet verplicht)' : ''

  return (
    <View
      accessibilityElementsHidden={!isAccessible} // in case of iOS
      accessibilityLanguage="nl-NL"
      importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
    >
      <Phrase
        emphasis={emphasis}
        testID="TextInputLabel">
        {text}
        {!!suffix && <Phrase>{suffix}</Phrase>}
      </Phrase>
    </View>
  )
}
