import type {ComponentProps} from 'react'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {validateEmail} from '@/utils/validate'

type Props<TName extends string> = Omit<
  ComponentProps<typeof TextInputField>,
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'importantForAutofill'
  | 'inputMode'
  | 'keyboardType'
  | 'textContentType'
  | 'name'
  | 'returnKeyType'
> & {name: TName}

export const EmailTextInputField = <TName extends string>({
  rules,
  testID,
  label = 'E-mailadres',
  ...props
}: Props<TName>) => (
  <TextInputField
    autoCapitalize="none"
    autoComplete="email"
    autoCorrect={false}
    importantForAutofill="yes"
    inputMode="email"
    keyboardType="email-address"
    label={label}
    returnKeyType="next"
    rules={{
      ...rules,
      validate: {
        ...rules?.validate,
        validateEmail: (value: string) => validateEmail(value),
      },
    }}
    testID={testID}
    textContentType="username"
    {...props}
  />
)
