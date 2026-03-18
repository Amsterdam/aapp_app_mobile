import {StyleSheet} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {
  ServiceMapResponse,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import {FilterButton} from '@/components/features/map/filters/FilterButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {ScrollView} from '@/components/ui/layout/ScrollView'

type Props = {
  activeFilters?: ServiceMapResponseFilter[]
  filters?: ServiceMapResponse['filters']
  onPressFilter?: (filter: ServiceMapResponseFilter) => void
} & TestProps

export const MapFilters = ({
  filters,
  activeFilters,
  onPressFilter,
  testID,
}: Props) => {
  if (!filters) {
    return null
  }

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      <Box insetHorizontal="md">
        <Row gutter="sm">
          {filters.map(filter => {
            const isActive = activeFilters?.some(
              activeFilter =>
                activeFilter.filter_key === filter.filter_key &&
                activeFilter.filter_value === filter.filter_value,
            )

            return (
              <FilterButton
                filter={filter}
                isActive={isActive}
                key={`${filter.filter_key}-${String(filter.filter_value)}`}
                onPressFilter={onPressFilter}
                testID={testID}
              />
            )
          })}
        </Row>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {flexGrow: 0},
})
