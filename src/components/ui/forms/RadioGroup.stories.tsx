import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'

export default {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export const Default: StoryObj<typeof RadioGroup> = {
  args: {
    options: [
      {
        label: 'Heldhaftig',
        value: 'valiant',
      },
      {
        label: 'Vastberaden',
        value: 'steadfast',
      },
      {
        label: 'Barmhartig',
        value: 'compassionate',
      },
    ],
    value: 'valiant',
  },
}

export const DisabledDefault: StoryObj<typeof RadioGroup> = {
  args: {
    options: [
      {
        label: 'Heldhaftig',
        value: 'valiant',
        disabled: true,
      },
      {
        label: 'Vastberaden',
        value: 'steadfast',
        disabled: true,
      },
      {
        label: 'Barmhartig',
        value: 'compassionate',
        disabled: false,
      },
    ],
    value: 'valiant',
    disabledStyle: 'default',
  },
}

export const DisabledHidden: StoryObj<typeof RadioGroup> = {
  args: {
    options: [
      {
        label: 'Heldhaftig',
        value: 'valiant',
        disabled: true,
      },
      {
        label: 'Vastberaden',
        value: 'steadfast',
        disabled: true,
      },
      {
        label: 'Barmhartig',
        value: 'compassionate',
        disabled: false,
      },
    ],
    value: 'valiant',
    disabledStyle: 'hidden',
  },
}

export const DisabledNone: StoryObj<typeof RadioGroup> = {
  args: {
    options: [
      {
        label: 'Heldhaftig',
        value: 'valiant',
        disabled: true,
      },
      {
        label: 'Vastberaden',
        value: 'steadfast',
        disabled: true,
      },
      {
        label: 'Barmhartig',
        value: 'compassionate',
        disabled: false,
      },
    ],
    value: 'valiant',
    disabledStyle: 'none',
  },
}
