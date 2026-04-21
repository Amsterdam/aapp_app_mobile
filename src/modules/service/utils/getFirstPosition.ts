import type {Position} from 'geojson'

export const getFirstPosition = (
  positions: Position | Position[] | Position[][] | Position[][][],
): Position => {
  let current: Position | Position[] | Position[][] | Position[][][] = positions

  while (Array.isArray(current[0])) {
    current = current[0] as Position[] | Position[][] | Position[][][]
  }

  return (current as Position).slice(0, 2)
}
