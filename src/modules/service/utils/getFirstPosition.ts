import type {Position} from 'geojson'

export const getFirstPosition = (
  positions: Position | Position[] | Position[][] | Position[][][],
): Position => {
  const firstElement = (positions as unknown as Array<unknown>)[0]

  if (Array.isArray(firstElement)) {
    return getFirstPosition(
      firstElement as Position | Position[] | Position[][] | Position[][][],
    )
  }

  return (positions as Position).slice(0, 2)
}
