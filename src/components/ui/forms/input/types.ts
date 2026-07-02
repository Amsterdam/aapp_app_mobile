import {type RefObject} from 'react'
import {type TextInputProps as TextInputPropsRN} from 'react-native'
import {TextInput as TextInputRN} from 'react-native-gesture-handler'

export enum FieldType {
  email = 'email',
  numeric = 'numeric',
  password = 'password',
  pin = 'pin',
  tel = 'tel',
  text = 'text',
  url = 'url',
}

export type TextInputSharedProps = {
  hasClearButton?: boolean
  inputInstructions?: string
  label?: string
  numberOfLines?: number
  placeholder?: string
  required?: boolean
  textTransform?: (text: string) => string
}

export type TextInputProps = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
  ref?: RefObject<TextInputRN | null>
  warning?: boolean
} & TextInputSharedProps &
  TextInputPropsRN
