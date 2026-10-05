import {FormProvider, useForm} from 'react-hook-form'
import {Text} from 'react-native'
import {Switch} from './Switch'
import {SwitchField} from './SwitchField'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: Switch,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Switch>

export const On: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: true,
  },
}
export const OnDisabled: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: true,
    disabled: true,
  },
}

export const Off: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: false,
  },
}
export const OffDisabled: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: false,
    disabled: true,
  },
}

/**
 * Loading state moet niet de layout wijzigen, dus gebruiken we een loading placeholder wanneer we mogelijk een loading state willen tonen.
 * Tijdens het laden is de toggle disabled.
 */
export const WithLoadingPlaceholderLoading: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: false,
    loading: true,
    hasLoadingPlaceholder: true,
  },
}

/**
 * Loading state moet niet de layout wijzigen, dus gebruiken we een loading placeholder wanneer we mogelijk een loading state willen tonen.
 */
export const WithLoadingPlaceholder: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: false,
    loading: false,
    hasLoadingPlaceholder: true,
  },
}

export const ErrorState: StoryObj<typeof Switch> = {
  render: args => {
    const form = useForm<{testSwitchField: boolean}>()

    form.setError('testSwitchField', {message: 'Test error'})

    return (
      <FormProvider {...form}>
        <SwitchField
          {...args}
          name="testSwitchField"
        />
      </FormProvider>
    )
  },
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'start',
    value: true,
  },
}
