import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {Canvas} from '@/storybook/components'

export default {
  component: Size,
} satisfies Meta<typeof Size>

export const Default: StoryFn<typeof Size> = args => (
  <Size {...args}>
    <Canvas highlight>
      <Phrase testID="Phrase">Ik accepteer afmetingen</Phrase>
    </Canvas>
  </Size>
)

Default.args = {
  maxWidth: 128,
  minHeight: 128,
}
