import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import type {ReactNode} from 'react'
import {
  RadioGroup,
  type RadioGroupProps,
} from '@/components/ui/forms/RadioGroup'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  LabelNode extends ReactNode = string,
> = Pick<
  RadioGroupProps<PathValue<TFieldValues, TName>, LabelNode>,
  'disabledStyle' | 'options' | 'orientation' | 'label'
> &
  UseControllerProps<TFieldValues, TName> &
  TestProps

export const RadioGroupControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  LabelNode extends ReactNode = string,
>({
  disabledStyle,
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
    <RadioGroup<PathValue<TFieldValues, TName>, LabelNode>
      disabledStyle={disabledStyle}
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
