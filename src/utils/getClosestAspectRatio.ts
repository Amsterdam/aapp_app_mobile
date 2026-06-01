import {mediaTokens, type ImageAspectRatio} from '@/themes/tokens/media'

export function getClosestAspectRatio(
  width: number,
  height: number,
): ImageAspectRatio

export function getClosestAspectRatio(aspectRatio: number): ImageAspectRatio

export function getClosestAspectRatio(
  widthOrAspectRatioValue: number,
  height?: number,
): ImageAspectRatio {
  let dynamicAspectRatio: number

  if (typeof height === 'undefined') {
    const aspectRatioValue = widthOrAspectRatioValue

    dynamicAspectRatio = aspectRatioValue
  } else {
    const width = widthOrAspectRatioValue

    dynamicAspectRatio = width / height
  }

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
