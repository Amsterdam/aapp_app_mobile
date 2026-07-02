import {Directory, EncodingType, File, Paths} from 'expo-file-system'
import {shareAsync} from 'expo-sharing'
import {Platform} from 'react-native'
import {devLog} from '@/processes/development'
import {contentTypeToUTI} from '@/utils/contentTypeToUTI'
import {fileExtensionToMimeType} from '@/utils/fileExtensionToMimeType'

type Params = {
  base64?: {
    data: string
    mimeType: string
  }
  downloadUri?: string
  fileName: string
  localUri?: string
}

/**
 *
 * @param downloadUri Optional. http:// or https://
 * @param fileName example.pdf
 * @param base64 Optional. Object containing string and mimeType
 * @param base64.data The base64 encoded string of the file content
 * @param base64.mimeType The MIME type of the file
 *
 */
export const saveFile = async ({
  base64,
  downloadUri,
  fileName,
  localUri,
}: Params) => {
  try {
    if (downloadUri) {
      const {mimeType, uri} = await downloadFile(downloadUri, fileName)

      const contentsAsBase64 = await readContentsAsBase64(uri)

      await saveFileOnDevice(contentsAsBase64, fileName, mimeType)
    } else if (base64) {
      await saveFileOnDevice(base64.data, fileName, base64.mimeType)
    } else if (localUri) {
      const contentsAsBase64 = await readContentsAsBase64(localUri)

      await saveFileOnDevice(contentsAsBase64, fileName)
    } else {
      throw 'Give either base64 or downloadUri as an argument to saveFile.'
    }
  } catch (error) {
    devLog(error)

    throw error
  }
}

const requestDirectoryPermission = async (): Promise<Directory> => {
  try {
    return await Directory.pickDirectoryAsync()
  } catch {
    throw 'Requesting directory permission failed.'
  }
}

const createEmptyFile = (
  directory: Directory,
  fileName: string,
  mimeType = 'application/pdf',
): File => {
  try {
    return directory.createFile(fileName, mimeType)
  } catch {
    throw 'Creating empty file failed.'
  }
}

const readContentsAsBase64 = async (uri: string): Promise<string> => {
  try {
    return await new File(uri).base64()
  } catch {
    throw 'Reading file as base64 string failed.'
  }
}

const writeFileContentsAsBase64String = (file: File, base64: string) => {
  try {
    file.write(base64, {
      encoding: EncodingType.Base64,
    })
    devLog(`saved to file ${file.uri}`)
  } catch {
    throw 'Writing base64 string to file failed.'
  }
}

const shareFile = async (
  base64: string,
  fileName: string,
  mimeType?: string,
) => {
  const file = new File(Paths.document, fileName)

  try {
    file.create({intermediates: true, overwrite: true})
    file.write(base64, {
      encoding: EncodingType.Base64,
    })
    await shareAsync(file.uri, {
      mimeType,
      UTI: mimeType ? contentTypeToUTI[mimeType] : undefined,
    })
    devLog(`saved to file ${file.uri}`)
  } catch {
    throw 'Failed to share file with other applications.'
  }
}

const saveOnAndroid = async (
  base64: string,
  fileName: string,
  mimeType?: string,
) => {
  try {
    const directory = await requestDirectoryPermission()
    const file = createEmptyFile(directory, fileName, mimeType)

    writeFileContentsAsBase64String(file, base64)
  } catch (error) {
    await shareFile(base64, fileName, mimeType)
    throw error
  }
}

const saveFileOnDevice = async (
  base64: string,
  fileName: string,
  mimeType?: string,
) => {
  const mimetype =
    fileExtensionToMimeType[fileName.split('.').pop() || ''] || mimeType

  if (Platform.OS === 'android') {
    await saveOnAndroid(base64, fileName, mimetype)
  } else {
    await shareFile(base64, fileName, mimetype)
  }
}

const downloadFile = async (downloadUri: string, filename: string) => {
  const file = new File(Paths.document, filename)

  const downloadedFile = await File.downloadFileAsync(downloadUri, file, {
    idempotent: true,
  })

  const mimeType =
    downloadedFile.type ||
    fileExtensionToMimeType[filename.split('.').pop() || ''] ||
    undefined

  return {uri: downloadedFile.uri, mimeType}
}
