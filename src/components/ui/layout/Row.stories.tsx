import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {Block, Canvas} from '@/storybook/components'

export default {
  component: Row,
} satisfies Meta<typeof Row>

export const Default: StoryFn<typeof Row> = args => (
  <Canvas highlight>
    <Row {...args}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Row>
  </Canvas>
)

Default.args = {
  align: 'start',
  gutter: 'md',
  wrap: false,
}

export const Wrapping: StoryFn<typeof Button & typeof Row> = args => (
  /**
   * Zet `wrap` aan om de items in een rij automatisch over meerdere regels te laten vallen.
   * De `gutter` wordt dan gebruikt als verticale ruimte tussen de items.
   * Je kunt de verticale ruimte tussen de items ook apart instellen met `vgutter`.
   */
  <Canvas
    highlight
    maxWidth="24rem">
    <Row {...args}>
      <Button
        label="Wijzig adres"
        testID="Button"
      />
      <Button
        label="Voeg adres toe"
        testID="Button"
        variant="secondary"
      />
      <Button
        label="Verwijder adres"
        testID="Button"
        variant="secondary"
      />
    </Row>
  </Canvas>
)

Wrapping.args = {
  gutter: 'md',
  wrap: true,
}
