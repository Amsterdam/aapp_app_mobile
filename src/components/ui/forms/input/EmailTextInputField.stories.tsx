import {FormProvider, useForm} from 'react-hook-form'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {PropsWithChildren} from 'react'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'

const Form = ({children}: PropsWithChildren) => {
  const form = useForm<{email: string}>()

  return <FormProvider {...form}>{children}</FormProvider>
}

export default {
  component: EmailTextInputField,
  render: args => (
    <Form>
      <EmailTextInputField
        {...args}
        name="email"
        testID="EmailTextInputField"
      />
    </Form>
  ),
} as Meta<typeof EmailTextInputField>

export const Default: StoryObj<typeof EmailTextInputField> = {
  args: {
    required: true,
  },
}
