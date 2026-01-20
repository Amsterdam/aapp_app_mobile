import {Linking} from 'react-native'

export const openExternalWebLink = async (url?: string | null) => {
  const isExternal = url && /^https?:\/\//.test(url ?? '')

  if (!isExternal) {
    return
  }

  await Linking.openURL(url)
}
