import {mergeAndOrderQueue} from '@/modules/news/utils/mergeAndOrderQueue'

describe('mergeAndOrderQueue', () => {
  it('should advance the queue in sequential order if the incoming Set remains the same.', () => {
    const initialSet = new Set([1, 2, 3, 4, 5])
    const incomingSet = new Set([1, 2, 3, 4, 5])

    const iteration1 = mergeAndOrderQueue(initialSet, incomingSet)
    const iteration2 = mergeAndOrderQueue(iteration1, incomingSet)
    const iteration3 = mergeAndOrderQueue(iteration2, incomingSet)
    const iteration4 = mergeAndOrderQueue(iteration3, incomingSet)
    const iteration5 = mergeAndOrderQueue(iteration4, incomingSet)

    expect([...iteration1]).toEqual([2, 3, 4, 5, 1])
    expect([...iteration2]).toEqual([3, 4, 5, 1, 2])
    expect([...iteration3]).toEqual([4, 5, 1, 2, 3])
    expect([...iteration4]).toEqual([5, 1, 2, 3, 4])
    expect([...iteration5]).toEqual([1, 2, 3, 4, 5])
  })

  it('should advance and preserve the queue, prepend new incoming elements and remove elements if no longer present in incoming Set.', () => {
    const initialSet = new Set([1, 2, 3, 4, 5])
    const incomingSet = new Set([6, 1, 2, 3, 4])

    const iteration1 = mergeAndOrderQueue(initialSet, incomingSet)
    const iteration2 = mergeAndOrderQueue(iteration1, incomingSet)
    const iteration3 = mergeAndOrderQueue(iteration2, new Set([6, 7, 8, 9]))
    const iteration4 = mergeAndOrderQueue(iteration3, new Set([1, 2, 3]))
    const iteration5 = mergeAndOrderQueue(
      iteration4,
      new Set([10, 5, 999, 1, 20, 88]),
    )

    expect([...iteration1]).toEqual([6, 2, 3, 4, 1])
    expect([...iteration2]).toEqual([2, 3, 4, 1, 6])
    expect([...iteration3]).toEqual([7, 8, 9, 6])
    expect([...iteration4]).toEqual([1, 2, 3])
    expect([...iteration5]).toEqual([10, 5, 999, 20, 88, 1])
  })

  it('should wipe queue if incoming Set is empty', () => {
    const iteration1 = mergeAndOrderQueue(new Set([1, 2, 3, 4, 5]), new Set())

    expect([...iteration1]).toEqual([])
  })

  it.each(Array.from({length: 5}).fill(new Set([1])))(
    'should return the same element if queue.size is 1',
    incomingSet => {
      const iteration = mergeAndOrderQueue(
        new Set([1]),
        incomingSet as Set<number>,
      )

      expect([...iteration]).toEqual([1])
    },
  )
})
