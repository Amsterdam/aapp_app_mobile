import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {ImageInput} from '@/components/ui/forms/ImageInput'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TestProps & UseControllerProps<TFieldValues, TName>

export const ImageInputControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  rules,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>({...controllerProps, rules})

  return (
    <Column>
      <ImageInput
        imageValue={value}
        onChange={onChange}
        testID={testID}
      />
      {!!error?.message && <Phrase color="warning">{error.message}</Phrase>}
    </Column>
  )
}
