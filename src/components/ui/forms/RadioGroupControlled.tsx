import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import type {ReactNode} from 'react'
import {
  RadioGroup,
  type RadioGroupOption,
} from '@/components/ui/forms/RadioGroup'
import {type LayoutOrientation, type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Node extends ReactNode = string,
> = {
  label?: string
  options?: RadioGroupOption<string, Node>[]
  orientation?: LayoutOrientation
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const RadioGroupControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Node extends ReactNode = string,
>({
  label,
  options,
  orientation,
  rules,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName, Node>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>({...controllerProps, rules})

  if (!options) {
    return null
  }

  return (
    <RadioGroup<string, Node>
      errorMessage={error?.message}
      label={label}
      onChange={onChange}
      options={options}
      orientation={orientation}
      required={!!rules?.required}
      testID={testID}
      value={value}
    />
  )
}
