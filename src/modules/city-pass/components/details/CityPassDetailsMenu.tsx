import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = {
  passNumber: number
}

export const CityPassDetailsMenu = ({passNumber}: Props) => {
  const {navigate} = useNavigation()

  const menuItems: PopupMenuItem[] = [
    {
      color: 'destructive',
      label: 'Pas blokkeren',
      onPress: () =>
        navigate(CityPassRouteName.cityPassBlockPass, {passNumber}),
      testID: 'CityPassDetailsMenuBlockButton',
    },
  ]

  return (
    <PopUpMenu
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
