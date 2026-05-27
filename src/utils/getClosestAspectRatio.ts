import {mediaTokens, type ImageAspectRatio} from '@/themes/tokens/media'

export const getClosestAspectRatio = (
  width: number,
  height: number,
): ImageAspectRatio => {
  const dynamicAspectRatio = width / height

  let closestAspectRatio: ImageAspectRatio = 'wide'
  let smallestDifference = Infinity

  for (const [key, value] of Object.entries(mediaTokens.aspectRatio) as Array<
    [ImageAspectRatio, number]
  >) {
    const diff = Math.abs(dynamicAspectRatio - value)

    if (diff < smallestDifference) {
      smallestDifference = diff
      closestAspectRatio = key
    }
  }

  return closestAspectRatio
}
