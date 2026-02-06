import {useCallback, useMemo} from 'react'
import {Platform} from 'react-native'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {
  PopupMenuOrientation,
  type PopupMenuItem,
} from '@/components/ui/menus/types'
import {DeviatingApiSlug} from '@/environment'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'
import {devError} from '@/processes/development'
import {selectApi} from '@/store/slices/environment'
import {useMenu} from '@/store/slices/menu'
import {dayjs} from '@/utils/datetime/dayjs'
import {saveFile} from '@/utils/saveFile'

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

  const pdfUrl = address?.bagId
    ? `${apiBase}/guide/pdf?bag_nummeraanduiding_id=${address.bagId}`
    : undefined

  const onPressAddToCalendar = useCallback(() => {
    close()

    if (!webCalUrl) {
      return
    }

    openWebUrl(
      Platform.OS === 'ios'
        ? webCalUrl
        : `https://www.google.com/calendar/render?cid=${encodeURIComponent(webCalUrl)}`,
    )
  }, [close, openWebUrl, webCalUrl])

  const onPressDownloadAsPdf = useCallback(async () => {
    close()

    if (!pdfUrl) {
      return
    }

    try {
      const res = await fetch(pdfUrl, {method: 'HEAD'})

      if (!res.ok) {
        throw new Error(`Failed to fetch PDF. Status: ${res.status}`)
      }

      await saveFile({
        downloadUri: pdfUrl,
        fileName: `Afvalkalender_${dayjs().format('DD-MM-YYYY')}_${address?.addressLine1.replaceAll(' ', '_')}.pdf`,
      })
    } catch (error) {
      devError('Error downloading waste guide PDF', error)
    }
  }, [close, pdfUrl, address?.addressLine1])

  const menuItems = useMemo(
    () =>
      [
        !!webCalUrl && {
          color: 'default',
          label: 'Toevoegen aan agenda',
          onPress: onPressAddToCalendar,
          testID: 'WasteGuideAddToCalendarButton',
        },
        !!pdfUrl && {
          color: 'default',
          label: 'Download als PDF',
          onPress: onPressDownloadAsPdf,
          testID: 'WasteGuideDownloadAsPdfButton',
        },
      ].filter((item): item is PopupMenuItem => Boolean(item)),
    [webCalUrl, pdfUrl, onPressAddToCalendar, onPressDownloadAsPdf],
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
