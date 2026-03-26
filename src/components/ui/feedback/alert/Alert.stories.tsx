import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {
  AlertProps,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {ParkingRouteName} from '@/modules/parking/routes'

const title = 'Titel'
const text = 'U kunt een dagontheffing of jaarontheffing aanvragen'

const meta: Meta<typeof AlertBase> = {
  component: AlertBase,
  argTypes: {
    hasCloseIcon: {
      type: 'boolean',
    },
    link: {
      label: {
        control: {type: 'text'},
      },
      onPress: {
        control: {disable: true},
      },
    },
    inset: {
      table: {
        disable: true,
      },
    },
    testID: {
      table: {
        disable: true,
      },
    },
    variant: {
      options: Object.values(AlertVariant),
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    title,
    text,
  },
}

export default meta

type Story = StoryObj<Omit<AlertProps, 'testID' | 'inset'>>

export const Default: Story = {
  args: {
    link: undefined,
  },
}

export const WithLink: Story = {
  args: {
    variant: AlertVariant.information,
    hasIcon: true,
    hasCloseIcon: true,
    title: 'Deze Alert heeft een link',
    text: 'Klik op de link hieronder',
    link: {
      label: 'Navigeer naar link',
      to: {
        name: ParkingRouteName.accounts,
        params: undefined,
      },
    },
  },
}
