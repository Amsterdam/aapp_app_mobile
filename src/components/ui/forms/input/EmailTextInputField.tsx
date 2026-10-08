import type {ComponentProps} from 'react'
import type {RegisterOptions} from 'react-hook-form'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {validateEmail} from '@/utils/validate'

type Props<TName extends string> = Pick<
  ComponentProps<typeof TextInputField>,
  | 'label'
  | 'returnKeyType'
  | 'testID'
  | 'required'
  | 'disabled'
  | 'onSubmitEditing'
> & {
  name: TName
  rules?: {validate: RegisterOptions['validate']}
}

export const EmailTextInputField = <TName extends string>({
  testID,
  rules,
  disabled,
  label = 'E-mailadres',
  returnKeyType = 'next',
  ...props
}: Props<TName>) => (
  <TextInputField
    autoCapitalize="none"
    autoComplete="email"
    autoCorrect={false}
    disabled={disabled}
    importantForAutofill="yes"
    inputMode="email"
    keyboardType="email-address"
    label={label}
    returnKeyType={returnKeyType}
    rules={{
      validate: {
        ...(typeof rules?.validate === 'function'
          ? {default: rules.validate}
          : rules?.validate),
        validateEmail: (value: string) =>
          props.required || (value.length > 0 && !disabled)
            ? validateEmail(value)
            : true,
      },
    }}
    testID={testID}
    textContentType="username"
    {...props}
  />
)
