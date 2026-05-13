import {Size} from '@/components/ui/layout/Size'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import CityPassImageSvg from '@/modules/city-pass/assets/city-pass.svg'

/** Get a sensible height as a fraction of the available height */
const getHeight = (deviceHeight: number, isLandscape: boolean) =>
  Math.round(deviceHeight / (isLandscape ? 3 : 4))

export const CityPassImage = () => {
  const {height: availableHeight, isLandscape} = useDeviceContext()
  const figureHeight = getHeight(availableHeight, isLandscape)

  return (
    <Size maxHeight={figureHeight}>
      <CityPassImageSvg />
    </Size>
  )
}
