import {
  useFormContext,
  type FieldValues,
  type FieldPath,
  type FieldPathValue,
} from 'react-hook-form'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {devError} from '@/processes/development'

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
    transformValue && value !== undefined && value !== null
      ? transformValue(value)
      : value

  if (typeof transformedValue !== 'string') {
    devError(
      `ParkingFixedFormField received an invalid value '${typeof transformedValue}' for field '${String(fieldName)}' without a valid transform.`,
    )

    return null
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
