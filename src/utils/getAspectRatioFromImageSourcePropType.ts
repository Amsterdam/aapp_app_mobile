import {type ImageSourcePropType, Image} from 'react-native'

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
    uri = source.uri
  }

  if (!uri) {
    return
  }

  const {width, height} = await Image.getSize(uri)

  return width / height
}
