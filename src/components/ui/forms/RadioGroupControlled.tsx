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
  LabelNode extends ReactNode = string,
> = {
  label?: string
  options?: RadioGroupOption<string, LabelNode>[]
  orientation?: LayoutOrientation
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const RadioGroupControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  LabelNode extends ReactNode = string,
>({
  label,
  options,
  orientation,
  rules,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName, LabelNode>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>({...controllerProps, rules})

  if (!options) {
    return null
  }

  return (
    <RadioGroup<string, LabelNode>
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
