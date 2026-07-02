import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useTheme} from '@/themes/useTheme'

const tips = [
  'Behandel één onderwerp per bericht. Splits anders op in meerdere berichten.',
  'Zorg dat je bericht vragen wegneemt, in plaats van dat het vragen oproept.',
  'Zet het belangrijkste bovenaan.',
  'Gebruik korte zinnen.',
  'Gebruik geen jargon en moeilijke woorden.',
  'Schrijf actief. Niet: ‘De weg wordt afgesloten’, maar: ‘We sluiten de weg af’.',
  'Spreek mensen aan met ‘u’.',
  'Geen spoed maar wel belangrijk? Overleg met de redactie over een nieuwsbericht op amsterdam.nl of projectpagina.',
]

export const WritingGuide = () => {
  const {text} = useTheme()

  return (
    <Box>
      <Column gutter="md">
        <Title text="Schrijftips" />
        {tips.map((tip, index) => {
          const step = (index + 1).toString()

          return (
            <SingleSelectable
              accessibilityLabel={`${step}, ${tip}`}
              key={tip}>
              <Row gutter="md">
                <Size height={text.lineHeight.body}>
                  <Phrase
                    emphasis="strong"
                    testID={`ConstructionWorkEditorWritingGuideStep${step}Phrase`}>
                    {step}
                  </Phrase>
                </Size>
                <Paragraph>{tip}</Paragraph>
              </Row>
            </SingleSelectable>
          )
        })}
      </Column>
    </Box>
  )
}
