import {act, renderHook} from '@testing-library/react-native'
import {
  useIsMarkerSelected,
  useSetMapSelection,
} from '@/components/features/map/MapSelectionContext'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type SelectionProps = {
  onMapSelection?: (selectedId?: string | number) => void
  selectedId?: string
}

describe('map selection', () => {
  it('notifies markers for programmatic selections and resets', () => {
    const {result, rerender} = renderHook(
      ({selectedId}: SelectionProps) => {
        useSetMapSelection(ModuleSlug['boat-charging'], selectedId)

        return [
          useIsMarkerSelected(ModuleSlug['boat-charging'], 'first'),
          useIsMarkerSelected(ModuleSlug['boat-charging'], 'second'),
        ]
      },
      {initialProps: {selectedId: 'first'}},
    )

    expect(result.current).toEqual([true, false])

    rerender({selectedId: 'second'})
    expect(result.current).toEqual([false, true])

    rerender({selectedId: undefined})
    expect(result.current).toEqual([false, false])
  })

  it('reports the synchronized ID without deferred or unmount callbacks', () => {
    const onMapSelection = jest.fn()

    const {rerender, unmount} = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(
          ModuleSlug['boat-charging'],
          selectedId,
          onMapSelection,
        ),
      {initialProps: {selectedId: 'first'}},
    )

    expect(onMapSelection.mock.calls).toEqual([['first']])

    rerender({selectedId: 'second'})
    expect(onMapSelection.mock.calls).toEqual([['first'], ['second']])

    rerender({selectedId: undefined})
    expect(onMapSelection.mock.calls).toEqual([
      ['first'],
      ['second'],
      [undefined],
    ])

    unmount()

    expect(onMapSelection).toHaveBeenCalledTimes(3)
  })

  it('uses the latest callback without treating callback changes as selection changes', () => {
    const firstCallback = jest.fn()
    const secondCallback = jest.fn()

    const {rerender} = renderHook(
      ({selectedId, onMapSelection}: SelectionProps) =>
        useSetMapSelection(
          ModuleSlug['boat-charging'],
          selectedId,
          onMapSelection,
        ),
      {
        initialProps: {
          selectedId: 'first',
          onMapSelection: firstCallback,
        },
      },
    )

    rerender({selectedId: 'first', onMapSelection: secondCallback})
    expect(firstCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).not.toHaveBeenCalled()

    rerender({selectedId: 'second', onMapSelection: secondCallback})
    expect(secondCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).toHaveBeenCalledWith('second')
  })

  it('clears the module selection on unmount', () => {
    const writer = renderHook(() =>
      useSetMapSelection(ModuleSlug['boat-charging'], 'first'),
    )

    const reader = renderHook(() =>
      useIsMarkerSelected(ModuleSlug['boat-charging'], 'first'),
    )

    expect(reader.result.current).toBe(true)

    act(() => writer.unmount())

    expect(reader.result.current).toBe(false)
  })
})
