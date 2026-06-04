import {type ImageSourcePropType, Image} from 'react-native'
import {devError} from '@/processes/development'

export const getAspectRatioFromImageSourcePropType = async (
  source: ImageSourcePropType,
) => {
  let uri: string | undefined

  if (typeof source === 'number') {
    uri = Image.resolveAssetSource(source)?.uri
  }

  if (Array.isArray(source)) {
    uri = source.find(item => typeof item?.uri === 'string')?.uri
  }

  if (source && typeof source === 'object' && 'uri' in source) {
    if (typeof source.uri === 'number') {
      uri = Image.resolveAssetSource(source.uri)?.uri
    } else if (typeof source.uri === 'string') {
      uri = source.uri
    }
  }

  if (!uri) {
    return
  }

  try {
    return await new Promise<number>((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          const aspectRatio = height > 0 && width > 0 ? width / height : 0

          resolve(aspectRatio)
        },
        () => {
          reject(new Error('Failed to get image size'))
        },
      )
    })
  } catch (e) {
    devError(e)

    return
  }
}
