import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Phrase} from '@/components/ui/text/Phrase'
import {Canvas} from '@/storybook/components'

export default {
  component: AspectRatio,
} satisfies Meta<typeof AspectRatio>

export const Default: StoryFn<typeof AspectRatio> = args => (
  <AspectRatio {...args}>
    <Canvas highlight>
      <Phrase testID="Phrase">Ik heb een bepaalde beeldverhouding.</Phrase>
    </Canvas>
  </AspectRatio>
)

Default.args = {
  aspectRatio: 'wide',
  orientation: 'landscape',
}
