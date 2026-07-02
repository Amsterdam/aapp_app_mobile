import {Controller, type UseControllerProps} from 'react-hook-form'
import {type TextInputProps} from 'react-native'
import {TextInput as TextInputRN} from 'react-native-gesture-handler'
import type {RefObject} from 'react'
import {CharactersLeftDisplay} from '@/components/ui/forms/CharactersLeftDisplay'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {TextInput} from '@/components/ui/forms/input/TextInput'
import {
  fieldTypeRules,
  fieldTypeToInputMode,
  fieldTypeToKeyboardType,
  getTextTransform,
} from '@/components/ui/forms/input/constants'
import {
  FieldType,
  TextInputSharedProps,
} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {
  fieldType?: FieldType
  maxCharacters?: number
  ref?: RefObject<TextInputRN | null>
} & TextInputSharedProps &
  TestProps &
  UseControllerProps &
  Pick<
    TextInputProps,
    | 'autoFocus'
    | 'autoCapitalize'
    | 'autoComplete'
    | 'autoCorrect'
    | 'keyboardType'
    | 'enterKeyHint'
    | 'inputMode'
    | 'onSubmitEditing'
    | 'submitBehavior'
    | 'returnKeyType'
    | 'maxLength'
    | 'textContentType'
    | 'importantForAutofill'
  >

export const TextInputField = ({
  ref,
  autoFocus,
  defaultValue = '',
  inputInstructions,
  label,
  maxCharacters,
  numberOfLines,
  name,
  placeholder,
  rules,
  testID,
  textTransform,
  fieldType = FieldType.text,
  ...textInputProps
}: Props) => {
  const accessibilityAnnounce = useAccessibilityAnnounce()

  return (
    <Controller
      defaultValue={defaultValue as string}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        if (error?.message) {
          accessibilityAnnounce(error.message)
        }

        return (
          <Column gutter="sm">
            <Column gutter="xs">
              <TextInput
                accessibilityHint={inputInstructions}
                accessibilityLabel={`${label}${rules?.required ? '' : ', niet verplicht'}`}
                accessibilityLanguage="nl-NL"
                autoFocus={autoFocus}
                inputInstructions={inputInstructions}
                inputMode={fieldTypeToInputMode[fieldType]}
                keyboardType={fieldTypeToKeyboardType[fieldType]}
                label={label}
                multiline={!!numberOfLines}
                numberOfLines={numberOfLines}
                onChangeText={onChange}
                placeholder={placeholder}
                ref={ref}
                required={!!rules?.required}
                secureTextEntry={fieldType === FieldType.password}
                testID={`${testID}Input`}
                textTransform={textTransform ?? getTextTransform(fieldType)}
                value={value as string}
                warning={!!error}
                {...textInputProps}
              />
            </Column>
            {!!maxCharacters && (
              <CharactersLeftDisplay
                maxCharacters={maxCharacters}
                numOfCharacters={(value as string).length}
              />
            )}
            {!!error?.message && (
              <ErrorMessage
                testID={`${testID}ErrorMessage`}
                text={error.message}
              />
            )}
          </Column>
        )
      }}
      rules={{...rules, ...fieldTypeRules[fieldType]}}
    />
  )
}
