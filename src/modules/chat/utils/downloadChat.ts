import {Alert} from 'react-native'
import {retrieveTranscript} from 'react-native-salesforce-messaging-in-app/src'
import {devError} from '@/processes/development'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTime} from '@/utils/datetime/formatDateTime'
import {saveFile} from '@/utils/saveFile'

export const downloadChat = async () => {
  try {
    const {transcript, entryId} = await retrieveTranscript()

    const fileName = `Chatgeschiedenis ${formatDateTime(dayjs()).replaceAll('.', ' ').replaceAll(':', ' ')}.pdf`
    const mimeType = 'application/pdf'

    await saveFile({base64: {data: transcript, mimeType}, fileName})

    return entryId
  } catch (error) {
    devError(error, JSON.stringify(error))
    Alert.alert('Chat downloaden mislukt.')
  }
}
