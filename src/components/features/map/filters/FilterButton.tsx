import type {ServiceMapResponseFilter} from '@/modules/service/types'
import {Button} from '@/components/ui/buttons/Button'

type Props = {
  filter: ServiceMapResponseFilter
  isActive?: boolean
  onPressFilter?: (filter: ServiceMapResponseFilter) => void
  testID?: string
}

export const FilterButton = ({
  filter,
  isActive,
  onPressFilter,
  testID,
}: Props) => (
  <Button
    icon={isActive ? {name: 'close', size: 'md'} : undefined}
    insetHorizontal="sm"
    isReverseOrder
    label={filter.label}
    onPress={() => onPressFilter?.(filter)}
    testID={`${testID}-${filter.filter_key}-Item`}
    variant={isActive ? 'primary' : 'secondary'}
  />
)
