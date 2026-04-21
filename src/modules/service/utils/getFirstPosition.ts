import type {Position} from 'geojson'

export const getFirstPosition = (
  positions: Position | Position[] | Position[][] | Position[][][],
): Position => positions.flat(3).slice(0, 2)
