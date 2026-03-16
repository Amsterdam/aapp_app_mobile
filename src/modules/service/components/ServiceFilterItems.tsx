import type {
  ServiceMapResponse,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {ScrollView} from '@/components/ui/layout/ScrollView'

type Props = {
  activeFilters?: ServiceMapResponseFilter[]
  filters?: ServiceMapResponse['filters']
  onPressFilter?: (filter: ServiceMapResponseFilter) => void
}

export const ServiceFilterItems = ({
  filters,
  activeFilters,
  onPressFilter,
}: Props) => {
  if (!filters) {
    return null
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}>
      <Row gutter="sm">
        {filters.map(filter => {
          const isActive = activeFilters?.includes(filter)

          return (
            <Button
              icon={isActive ? {name: 'close', size: 'md'} : undefined}
              key={filter.filter_key}
              label={filter.label}
              onPress={() => onPressFilter?.(filter)}
              testID={`ServiceFilter-${filter.filter_key}-Item`}
              variant={isActive ? 'primary' : 'secondary'}
            />
          )
        })}
      </Row>
    </ScrollView>
  )
}
