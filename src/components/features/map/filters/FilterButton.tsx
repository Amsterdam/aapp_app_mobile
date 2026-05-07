import type {Filter} from '@/components/features/map/providers/MapFiltersProvider'
import {Button} from '@/components/ui/buttons/Button'

type Props = {
  filter: Filter
  isActive?: boolean
  onPressFilter?: (filter: Filter) => void
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
