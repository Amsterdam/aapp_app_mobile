import {useMemo} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {
  PopupMenuOrientation,
  type PopupMenuItem,
} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'

export const BoatChargingHeaderMenu = () => {
  const navigation = useNavigation<BoatChargingRouteName>()

  const menuItems: PopupMenuItem[] = useMemo(
    () => [
      {
        label: 'Laadgeschiedenis',
        onPress: () => navigation.navigate(BoatChargingRouteName.history),
        testID: 'BoatChargingHeaderMenuHistoryButton',
      },
      {
        label: 'Mijn vignetten',
        onPress: () => navigation.navigate(BoatChargingRouteName.myVignettes),
        testID: 'BoatChargingHeaderMenuMyVignettesButton',
      },
      {
        label: 'Meer over boot laden',
        redirectKey: RedirectKey.boatChargingInfo,
        testID: 'BoatChargingHeaderMenuMoreAboutBoatChargingButton',
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
