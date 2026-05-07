import {
  type PropsWithChildren,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {MapFiltersContext} from '@/components/features/map/providers/MapFiltersContext'

export type Filter = {
  filter_key: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter_value: any
  label: string
}

type Props = {
  filters?: Filter[]
  layers?: (Filter & {
    icon: ServiceMapResponseIcon | undefined
    icon_label: string
  })[]
}

export const MapFiltersProvider = ({
  children,
  filters,
  layers,
}: PropsWithChildren<Props>) => {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])

  useEffect(() => {
    if (layers) {
      setActiveFilters(layers)
    }
  }, [layers])

  const onPressFilter = useCallback((filter: Filter) => {
    setActiveFilters(currentFilters =>
      currentFilters.some(f => getFilterIsEqual(f, filter))
        ? currentFilters.filter(f => !getFilterIsEqual(f, filter))
        : [...currentFilters, filter],
    )
  }, [])

  const value = useMemo(
    () => ({activeFilters, onPressFilter, filters, layers}),
    [activeFilters, onPressFilter, filters, layers],
  )

  return (
    <MapFiltersContext.Provider value={value}>
      {children}
    </MapFiltersContext.Provider>
  )
}

const getFilterIsEqual = (filterA: Filter, filterB: Filter) =>
  filterA.filter_key === filterB.filter_key &&
  filterA.filter_value === filterB.filter_value
