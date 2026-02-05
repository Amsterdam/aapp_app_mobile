import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import type {RootStackParams} from '@/app/navigation/types'
import type {IconProps} from '@/components/ui/media/Icon'
import {SelectButton} from '@/components/ui/forms/SelectButton'
import {type TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type ValueFunctionOrString<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = string | ((value: PathValue<TFieldValues, TName>) => string | undefined)

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  accessibilityHint?: ValueFunctionOrString<TFieldValues, TName>
  accessibilityLabel?: ValueFunctionOrString<TFieldValues, TName>
  bottomSheetVariant?: string
  icon: IconProps
  routeName?: keyof RootStackParams
  text?: ValueFunctionOrString<TFieldValues, TName>
  textAdditional?: ValueFunctionOrString<TFieldValues, TName>
  title: string | ((value: PathValue<TFieldValues, TName>) => string)
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const SelectButtonControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  bottomSheetVariant,
  testID,
  title,
  text,
  textAdditional,
  icon,
  routeName,
  accessibilityLabel,
  accessibilityHint,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {toggle} = useBottomSheet()
  const {navigate} = useNavigation()
  const {
    field: {value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  useAccessibilityAnnounceEffect(error?.message)

  return (
    <SelectButton
      accessibilityHint={
        typeof accessibilityHint === 'string'
          ? accessibilityHint
          : accessibilityHint?.(value)
      }
      accessibilityLabel={
        typeof accessibilityLabel === 'string'
          ? accessibilityLabel
          : accessibilityLabel?.(value)
      }
      error={error}
      icon={icon}
      iconRightName={routeName ? 'chevron-right' : 'chevron-down'}
      onPress={(): void => {
        if (routeName) {
          navigate(routeName, {} as never)
        } else {
          toggle(bottomSheetVariant)
        }
      }}
      testID={testID}
      text={typeof text === 'string' ? text : text?.(value)}
      textAdditional={
        typeof textAdditional === 'string'
          ? textAdditional
          : textAdditional?.(value)
      }
      title={typeof title === 'string' ? title : title?.(value)}
    />
  )
}
