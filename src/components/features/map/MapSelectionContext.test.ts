import {act, renderHook} from '@testing-library/react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {
  type MapIdentifier,
  useIsMarkerSelected,
  useSetMapSelection,
} from '@/components/features/map/MapSelectionContext'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type SelectionProps = {
  onMapSelection?: ((selectedId?: string | number) => void) | string
  selectedId?: string | number
}

jest.mock('@/components/features/bottom-sheet/hooks/useBottomSheet')

const openBottomSheet = jest.fn()
const closeBottomSheet = jest.fn()

describe('map selection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(useBottomSheet).mockReturnValue({
      close: closeBottomSheet,
      isOpen: false,
      open: openBottomSheet,
      toggle: jest.fn(),
    })
  })

  it('opens the supplied bottom-sheet variant on selection but not on reset or unmount', () => {
    const initialProps: SelectionProps = {
      onMapSelection: 'details',
      selectedId: undefined,
    }
    const {rerender, unmount} = renderHook(
      ({selectedId, onMapSelection}: SelectionProps) =>
        useSetMapSelection(
          ModuleSlug['boat-charging'],
          selectedId,
          onMapSelection,
        ),
      {initialProps},
    )

    expect(openBottomSheet).not.toHaveBeenCalled()

    rerender({onMapSelection: 'details', selectedId: 'first'})
    expect(openBottomSheet.mock.calls).toEqual([['details']])

    rerender({onMapSelection: 'details', selectedId: 'first'})
    expect(openBottomSheet).toHaveBeenCalledTimes(1)

    rerender({onMapSelection: 'details', selectedId: 'second'})
    expect(openBottomSheet.mock.calls).toEqual([['details'], ['details']])

    rerender({onMapSelection: 'details', selectedId: undefined})
    unmount()

    expect(openBottomSheet).toHaveBeenCalledTimes(2)
    expect(closeBottomSheet).not.toHaveBeenCalled()
  })

  it('opens the sheet for numeric marker ID zero on mount', () => {
    renderHook(() =>
      useSetMapSelection(ModuleSlug['boat-charging'], 0, 'details'),
    )

    expect(openBottomSheet).toHaveBeenCalledTimes(1)
    expect(openBottomSheet).toHaveBeenCalledWith('details')
  })

  it('uses the latest sheet variant without opening it when only the variant changes', () => {
    const {rerender} = renderHook(
      ({selectedId, onMapSelection}: SelectionProps) =>
        useSetMapSelection(
          ModuleSlug['boat-charging'],
          selectedId,
          onMapSelection,
        ),
      {
        initialProps: {
          onMapSelection: 'details',
          selectedId: 'first',
        },
      },
    )

    rerender({onMapSelection: 'other-details', selectedId: 'first'})
    expect(openBottomSheet.mock.calls).toEqual([['details']])

    rerender({onMapSelection: 'other-details', selectedId: 'second'})
    expect(openBottomSheet.mock.calls).toEqual([['details'], ['other-details']])
  })

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

  it('keeps remaining subscribers connected when another subscriber unmounts', () => {
    const writer = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(ModuleSlug.service, selectedId),
      {initialProps: {selectedId: 'first'}},
    )
    const firstReader = renderHook(() =>
      useIsMarkerSelected(ModuleSlug.service, 'first'),
    )
    const secondReader = renderHook(() =>
      useIsMarkerSelected(ModuleSlug.service, 'second'),
    )

    expect(firstReader.result.current).toBe(true)
    expect(secondReader.result.current).toBe(false)
    firstReader.unmount()

    writer.rerender({selectedId: 'second'})
    expect(secondReader.result.current).toBe(true)
    writer.rerender({selectedId: undefined})
    expect(secondReader.result.current).toBe(false)
  })

  it('can subscribe again after the last subscriber unmounts', () => {
    const writer = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(ModuleSlug.service, selectedId),
      {initialProps: {selectedId: 'first'}},
    )
    const firstReader = renderHook(() =>
      useIsMarkerSelected(ModuleSlug.service, 'first'),
    )

    firstReader.unmount()

    const nextReader = renderHook(() =>
      useIsMarkerSelected(ModuleSlug.service, 'second'),
    )

    writer.rerender({selectedId: 'second'})
    expect(nextReader.result.current).toBe(true)
  })

  it('isolates selections and cleanup between maps in the same module', () => {
    const firstMap: MapIdentifier = `${ModuleSlug.service}.first`
    const secondMap: MapIdentifier = `${ModuleSlug.service}.second`
    const firstWriter = renderHook(() =>
      useSetMapSelection(firstMap, 'shared-point'),
    )

    renderHook(() => useSetMapSelection(secondMap, 'shared-point'))

    const reader = renderHook(() => [
      useIsMarkerSelected(firstMap, 'shared-point'),
      useIsMarkerSelected(secondMap, 'shared-point'),
    ])

    expect(reader.result.current).toEqual([true, true])
    firstWriter.unmount()

    expect(reader.result.current).toEqual([false, true])
  })

  it('moves a reader subscription when its map identifier changes', () => {
    const firstMap: MapIdentifier = `${ModuleSlug.service}.first`
    const secondMap: MapIdentifier = `${ModuleSlug.service}.second`
    const firstWriter = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(firstMap, selectedId),
      {initialProps: {selectedId: 'point'}},
    )
    const secondWriter = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(secondMap, selectedId),
      {initialProps: {selectedId: 'other-point'}},
    )
    const reader = renderHook(
      ({mapIdentifier}: {mapIdentifier: MapIdentifier}) =>
        useIsMarkerSelected(mapIdentifier, 'point'),
      {initialProps: {mapIdentifier: firstMap}},
    )

    expect(reader.result.current).toBe(true)
    reader.rerender({mapIdentifier: secondMap})
    expect(reader.result.current).toBe(false)
    firstWriter.rerender({selectedId: 'other-point'})
    expect(reader.result.current).toBe(false)
    secondWriter.rerender({selectedId: 'point'})
    expect(reader.result.current).toBe(true)
  })

  it('clears the previous map and synchronizes the new map when a writer changes identifier', () => {
    const firstMap: MapIdentifier = `${ModuleSlug.service}.first`
    const secondMap: MapIdentifier = `${ModuleSlug.service}.second`
    const onMapSelection = jest.fn()
    const writer = renderHook(
      ({mapIdentifier}: {mapIdentifier: MapIdentifier}) =>
        useSetMapSelection(mapIdentifier, 'point', onMapSelection),
      {initialProps: {mapIdentifier: firstMap}},
    )
    const reader = renderHook(() => [
      useIsMarkerSelected(firstMap, 'point'),
      useIsMarkerSelected(secondMap, 'point'),
    ])

    expect(reader.result.current).toEqual([true, false])
    writer.rerender({mapIdentifier: secondMap})
    expect(reader.result.current).toEqual([false, true])
    expect(onMapSelection.mock.calls).toEqual([['point'], ['point']])
  })

  it('updates when a reader changes marker ID and does not select an undefined ID', () => {
    renderHook(() => useSetMapSelection(ModuleSlug.service, 0))
    const initialProps: SelectionProps = {selectedId: 'other-point'}
    const reader = renderHook(
      ({selectedId}: SelectionProps) =>
        useIsMarkerSelected(ModuleSlug.service, selectedId),
      {initialProps},
    )

    expect(reader.result.current).toBe(false)
    reader.rerender({selectedId: 0})
    expect(reader.result.current).toBe(true)
    reader.rerender({selectedId: undefined})
    expect(reader.result.current).toBe(false)
  })

  it('does not rerender readers whose selected snapshot stays unchanged', () => {
    const writer = renderHook(
      ({selectedId}: SelectionProps) =>
        useSetMapSelection(ModuleSlug.service, selectedId),
      {initialProps: {selectedId: 'first'}},
    )
    const onRender = jest.fn()

    renderHook(() => {
      const isSelected = useIsMarkerSelected(ModuleSlug.service, 'third')

      onRender(isSelected)

      return isSelected
    })
    onRender.mockClear()

    writer.rerender({selectedId: 'second'})
    expect(onRender).not.toHaveBeenCalled()
    writer.rerender({selectedId: 'third'})
    expect(onRender).toHaveBeenCalledWith(true)
  })
})
