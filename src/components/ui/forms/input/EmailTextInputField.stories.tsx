import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FormProvider, useForm, type UseFormProps} from 'react-hook-form'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'

type EmailInputForm = {email: string}

export default {
  parameters: {
    controls: {exclude: ['name', 'rules', 'testID']},
  },
  component: EmailTextInputField,
  render: (args, {parameters}) => {
    const form = useForm<EmailInputForm>({
      errors: parameters.errors as UseFormProps['errors'],
    })

    return (
      <FormProvider {...form}>
        <EmailTextInputField
          {...args}
          name="email"
        />
      </FormProvider>
    )
  },
} satisfies Meta<typeof EmailTextInputField>

export const Default: StoryObj<typeof EmailTextInputField> = {
  args: {
    required: true,
    name: 'email',
  },
}

export const ErrorState: StoryObj<typeof EmailTextInputField> = {
  args: {
    required: true,
  },
  parameters: {
    errors: {
      email: {message: 'E-mailadres is niet geldig', type: 'validate'},
    },
  },
}
