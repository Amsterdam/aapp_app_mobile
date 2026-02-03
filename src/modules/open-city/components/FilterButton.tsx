import {Button} from '@/components/ui/buttons/Button'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const OpenCityFilterButton = () => {
  const {toggle} = useBottomSheet()

  return (
    <Button
      iconName="chevron-down"
      label="Filter"
      onPress={() => toggle()}
      testID="OpenCityListScreenFilterButton"
      variant="secondary"
    />
  )
}
