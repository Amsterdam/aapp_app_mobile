import {useCallback} from 'react'
import {Platform} from 'react-native'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuOrientation} from '@/components/ui/menus/types'
import {DeviatingApiSlug} from '@/environment'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'
import {selectApi} from '@/store/slices/environment'
import {useMenu} from '@/store/slices/menu'

export const WasteGuideCalendarMenu = () => {
  const {address} = useSelectedAddress(ModuleSlug['waste-guide'])
  const {close} = useMenu()
  const openWebUrl = useOpenWebUrl()

  const apiBase = useSelector(
    selectApi(DeviatingApiSlug.waste, '/api/v1', 'https'),
  )
  const webCalUrl = address?.bagId
    ? `${apiBase}/guide/${address.bagId}.ics`
    : undefined
  const onPressAddToCalendar = useCallback(() => {
    close()

    if (webCalUrl) {
      openWebUrl(
        Platform.OS === 'ios'
          ? webCalUrl
          : `https://www.google.com/calendar/render?cid=${encodeURIComponent(webCalUrl)}`,
      )
    }
  }, [close, openWebUrl, webCalUrl])

  return (
    <PopUpMenu
      menuItems={[
        {
          color: 'default',
          label: 'Toevoegen aan agenda',
          onPress: onPressAddToCalendar,
          testID: 'WasteGuideAddToCalendarButton',
        },
      ]}
      orientation={PopupMenuOrientation.right}
    />
  )
}
