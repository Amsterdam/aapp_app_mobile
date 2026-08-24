import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'

export default {
  component: SomethingWentWrong,
} satisfies Meta<typeof SomethingWentWrong>

export const Default: StoryFn<typeof SomethingWentWrong> = () => (
  <SomethingWentWrong testID="testIdSomethingWentWrong" />
)
