import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCopyToClipboard} from '@/hooks/useCopyToClipboard'
import {CityPass} from '@/modules/city-pass/types'
import {stringGroupInto} from '@/utils/stringGroupInto'

type Props = {
  passNumberComplete: CityPass['passNumberComplete']
}

export const CityPassDetailsPassNumber = ({passNumberComplete}: Props) => {
  const {isCopied, copyToClipboard} = useCopyToClipboard(passNumberComplete)

  return (
    <Pressable
      accessibilityHint="Druk om het pasnummer te kopiëren"
      accessibilityLabel={`Pasnummer ${isCopied ? 'Gekopieerd' : stringGroupInto(passNumberComplete, 4)}`}
      onPress={() => copyToClipboard()}
      testID="CityPassDetailScreenCopyButton">
      <Row
        align="between"
        gutter="sm"
        vgutter="sm"
        wrap>
        <HideFromAccessibility>
          <Phrase testID="CityPassCityPassDetailsPassNumberLabel">
            Pasnummer
          </Phrase>
        </HideFromAccessibility>
        <Row gutter="sm">
          <Phrase
            accessible={false}
            color={isCopied ? 'confirm' : undefined}
            emphasis="strong"
            selectable
            testID="CityPassCityPassDetailsPassNumberValue">
            {isCopied ? 'Gekopieerd' : stringGroupInto(passNumberComplete, 4)}
          </Phrase>
          <Icon
            color={isCopied ? 'confirm' : 'link'}
            name="copy"
            size="md"
            testID="CityPassDetailScreenCopyButtonIcon"
          />
        </Row>
      </Row>
    </Pressable>
  )
}
