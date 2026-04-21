import {memo} from 'react'
import {type ViewProps, View} from 'react-native'
import {Pie, type PieProps} from '@/components/features/map/clusters/Pie'

const checkWrapperPropsHaveChanged = (
  prevProps: WrapperProps,
  nextProps: WrapperProps,
) =>
  prevProps.size === nextProps.size &&
  prevProps.pie
    ?.map(slice => [slice.percentage, slice.color].join('-'))
    .join('_') ===
    nextProps.pie
      ?.map(slice => [slice.percentage, slice.color].join('-'))
      .join('-')

type WrapperProps = {
  pie: PieProps['data'] | undefined
  size: number
} & ViewProps

export const ClusterMarkerWrapper = memo(
  ({pie, size, ...props}: WrapperProps) =>
    pie ? (
      <Pie
        data={pie}
        size={size}
        {...props}
      />
    ) : (
      <View {...props} />
    ),
  checkWrapperPropsHaveChanged,
)
