import {getFirstPosition} from '@/modules/service/utils/getFirstPosition'

describe('getFirstPosition', () => {
  it('should return a Position regardless of how deeply nested the input is.', () => {
    const position1 = [1, 2]
    const position2 = [[1, 2]]
    const position3 = [[[1, 2]]]
    const position4 = [[[[1, 2]]]]

    expect(getFirstPosition(position1)).toEqual([1, 2])
    expect(getFirstPosition(position2)).toEqual([1, 2])
    expect(getFirstPosition(position3)).toEqual([1, 2])
    expect(getFirstPosition(position4)).toEqual([1, 2])
  })

  it('should return only 2 entries', () => {
    const position1 = [1, 2, 3, 4]
    const position2 = [[1, 2, 3, 4]]
    const position3 = [[[1, 2, 3, 4]]]
    const position4 = [[[[1, 2, 3, 4]]]]

    expect(getFirstPosition(position1)).toEqual([1, 2])
    expect(getFirstPosition(position2)).toEqual([1, 2])
    expect(getFirstPosition(position3)).toEqual([1, 2])
    expect(getFirstPosition(position4)).toEqual([1, 2])
  })

  it('should return only 2 entries, from the first entry in the nested array', () => {
    const position1 = [1, 2]
    const position2 = [
      [1, 2],
      [3, 4],
    ]
    const position3 = [
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
    ]
    const position4 = [
      [
        [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
        ],
      ],
    ]

    expect(getFirstPosition(position1)).toEqual([1, 2])
    expect(getFirstPosition(position2)).toEqual([1, 2])
    expect(getFirstPosition(position3)).toEqual([1, 2])
    expect(getFirstPosition(position4)).toEqual([1, 2])
  })
})
