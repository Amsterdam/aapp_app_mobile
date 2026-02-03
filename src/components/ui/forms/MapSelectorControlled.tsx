import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {MapSelector} from '@/components/features/map/MapSelector'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string
  mapHeight?: number
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const MapSelectorControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  mapHeight,
  rules,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <Column gutter="md">
      {!!label && (
        <Label
          isAccessible
          required={!!rules?.required}
          text={label}
        />
      )}
      <MapSelector
        mapHeight={mapHeight}
        onSelect={onChange}
        testID={testID}
      />
      {!!error?.message && (
        <ErrorMessage
          testID={`${testID}ErrorMessage`}
          text={error.message}
        />
      )}
    </Column>
  )
}
