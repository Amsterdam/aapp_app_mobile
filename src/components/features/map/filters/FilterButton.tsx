import type {Filter} from '@/components/features/map/providers/MapFilters.provider'
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
    accessibilityHint={`Dubbeltik om filter ${isActive ? 'uit te zetten' : 'te activeren'}.`}
    accessibilityLabel={`Filter ${filter.label}, is ${isActive ? 'actief' : 'niet actief'}.`}
    icon={isActive ? {name: 'close', size: 'md'} : undefined}
    insetHorizontal="sm"
    isReverseOrder
    label={filter.label}
    onPress={() => onPressFilter?.(filter)}
    testID={`${testID}-${filter.filter_key}-Item`}
    variant={isActive ? 'primary' : 'secondary'}
  />
)
