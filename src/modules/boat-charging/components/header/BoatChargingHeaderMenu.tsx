import {useMemo} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {
  PopupMenuOrientation,
  type PopupMenuItem,
} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingHeaderMenu = () => {
  const navigation = useNavigation<BoatChargingRouteName>()

  const menuItems: PopupMenuItem[] = useMemo(
    () => [
      {
        color: 'default',
        label: 'Laadgeschiedenis',
        onPress: () => navigation.navigate(BoatChargingRouteName.history),
        testID: 'BoatChargingHeaderMenuHistoryButton',
      },
      {
        color: 'default',
        label: 'Mijn vignetten',
        onPress: () => navigation.navigate(BoatChargingRouteName.myVignettes),
        testID: 'BoatChargingHeaderMenuMyVignettesButton',
      },
    ],
    [navigation],
  )

  if (!menuItems.length) {
    return null
  }

  return (
    <PopUpMenu
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
