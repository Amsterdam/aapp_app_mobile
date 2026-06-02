import {useSelector} from '@/hooks/redux/useSelector'
import {useNewsDistrictsQuery} from '@/modules/news/service'
import {selectSelectedDistrict} from '@/modules/news/slice'

export const useSelectedDistrict = () => {
  const selectedDistrictLabel = useSelector(selectSelectedDistrict)
  const {data: districts, isLoading, isError} = useNewsDistrictsQuery()
  const selectedDistrict = districts?.data.find(
    d => d.label === selectedDistrictLabel,
  ) ?? {label: 'centrum', name: 'Stadsdeel Centrum'}

  return {district: selectedDistrict, isLoading, isError}
}
