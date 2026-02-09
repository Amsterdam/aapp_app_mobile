import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {Options, type OptionsProps} from '@/components/ui/forms/Options'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<OptionsProps<string>, 'onChange'> &
  TestProps &
  UseControllerProps<TFieldValues, TName>

export const OptionsControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  options,
  orientation,
  testID,
  type,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  if (!options) {
    return null
  }

  return (
    <Options<string>
      errorMessage={error?.message}
      label={label}
      onChange={onChange}
      options={options}
      orientation={orientation}
      required={!!controllerProps.rules?.required}
      testID={testID}
      type={type}
      value={value}
    />
  )
}
