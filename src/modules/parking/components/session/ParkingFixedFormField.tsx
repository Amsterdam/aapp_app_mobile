import {
  useFormContext,
  type FieldValues,
  type FieldPath,
  type FieldPathValue,
} from 'react-hook-form'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

type Props<T extends FieldValues, P extends FieldPath<T>> = {
  fieldName: P
  label: string
  transformValue?: (value: NonNullable<FieldPathValue<T, P>>) => string
}

export const ParkingFixedFormField = <
  T extends FieldValues,
  P extends FieldPath<T> = FieldPath<T>,
>({
  fieldName,
  label,
  transformValue,
}: Props<T, P>) => {
  const {watch} = useFormContext<T>()
  const value = watch(fieldName)

  const transformedValue =
    transformValue && value ? transformValue(value) : value

  if (typeof transformedValue !== 'string') {
    throw new TypeError(
      `Field value is of invalid type '${typeof transformedValue}'.`,
    )
  }

  return (
    <Column>
      <Title
        level="h5"
        text={label}
      />
      <Paragraph>{transformedValue}</Paragraph>
    </Column>
  )
}
