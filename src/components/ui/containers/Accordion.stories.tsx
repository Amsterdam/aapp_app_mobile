import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Accordion} from './Accordion'
import {Paragraph} from '@/components/ui/text/Paragraph'

export default {
  component: Accordion,
} satisfies Meta<typeof Accordion>

const paragraphText =
  'Een accordeon (Engels: accordion) is een klikbare verticaal gestapelde lijst van koppen om bijbehorende inhoud te verbergen of te vertonen. Je toont inhoud op een progressieve manier aan gebruikers. Ze zijn geschikt zodra gebruikers op zoek zijn naar essentiële inhoud op 1 pagina. Door niet essentiële inhoud te verbergen, kunnen gebruikers focussen op de primaire inhoud.'

export const Default: StoryFn<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)

Default.args = {
  title: 'Wat is een accordeon?',
}

export const LongTitle: StoryFn<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)

LongTitle.args = {
  title:
    'De titel moet zo kort als mogelijk zijn, maar ook duidelijk en representatief voor de verborgen inhoud',
}

export const Multiple: StoryFn<typeof Accordion> = () => (
  <>
    {['Grof afval', 'Restafval', 'Containers in de buurt', 'Recyclepunten'].map(
      title => (
        <Accordion
          key={title}
          testID={`${title}Accordion`}
          title={title}>
          <Paragraph>
            Informatie over {title.toLowerCase()} komt hier.
          </Paragraph>
        </Accordion>
      ),
    )}
  </>
)
