import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FormProvider, useForm, type UseFormProps} from 'react-hook-form'
import {TextInput} from '@/components/ui/forms/input/TextInput'
import {TextInputField} from './TextInputField'

type TextInputForm = {input: string}

export default {
  component: TextInput,
  render: (args, {parameters}) => {
    const form = useForm<TextInputForm>({
      errors: parameters.errors as UseFormProps['errors'],
    })

    return (
      <FormProvider {...form}>
        <TextInputField
          {...args}
          name="input"
          testID="TextInputField"
        />
      </FormProvider>
    )
  },
} satisfies Meta<typeof TextInput>

export const Default: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    placeholder: 'Voer een titel in...',
    value: '',
  },
}

export const Multiline: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    multiline: true,
    numberOfLines: 5,
    placeholder: 'Voer een titel in...',
    value: '',
  },
}

export const ErrorState: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    placeholder: 'Voer een titel in...',
    value: '',
  },
  parameters: {
    errors: {
      input: {
        message: 'Voer een correcte waarde in',
        type: 'validate',
      },
    },
  },
}
