import {debounce} from '@/utils/debounce'

describe('debounce', () => {
  jest.useFakeTimers()

  it('should call the function after the delay', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 500)

    debouncedFn('a', 'b', 'c')
    jest.advanceTimersByTime(500)
    expect(mockFn).toHaveBeenCalledWith('a', 'b', 'c')
  })

  it('should not call the function if called again within the delay', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 500)

    debouncedFn('ad', 'b', 'c')
    debouncedFn('d', 'e', 'f')
    jest.advanceTimersByTime(250)
    expect(mockFn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(250)
    expect(mockFn).toHaveBeenCalledWith('d', 'e', 'f')
  })

  it('should handle null or undefined arguments', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 500)

    debouncedFn(null, undefined)
    jest.advanceTimersByTime(500)
    expect(mockFn).toHaveBeenCalledWith(null, undefined)
  })
})
