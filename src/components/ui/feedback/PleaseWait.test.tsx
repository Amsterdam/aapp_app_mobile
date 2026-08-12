import {act, render} from '@testing-library/react-native'
import {type ComponentProps} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {StoreProvider} from '@/providers/store.provider'

describe('PleaseWait', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const renderPleaseWait = (
    props: ComponentProps<typeof PleaseWait> | Record<string, unknown>,
  ) =>
    render(
      <StoreProvider>
        <PleaseWait {...(props as ComponentProps<typeof PleaseWait>)} />
      </StoreProvider>,
    )

  it('renders the spinner with a valid testID', () => {
    const {getByTestId, queryByTestId} = renderPleaseWait({
      testID: 'PleaseWait',
    })

    expect(getByTestId('PleaseWait')).toBeTruthy()
    expect(queryByTestId('PleaseWaitFeedbackPhrase')).toBeNull()
  })

  it('does not render feedback when showFeedback is undefined or null', () => {
    const undefinedPropsRender = renderPleaseWait({showFeedback: undefined})

    act(() => {
      jest.advanceTimersByTime(16000)
    })

    expect(
      undefinedPropsRender.queryByTestId('PleaseWaitFeedbackPhrase'),
    ).toBeNull()

    undefinedPropsRender.unmount()

    const nullPropsRender = renderPleaseWait({showFeedback: null})

    act(() => {
      jest.advanceTimersByTime(16000)
    })

    expect(nullPropsRender.queryByTestId('PleaseWaitFeedbackPhrase')).toBeNull()
  })

  it('shows the first feedback message after five seconds when showFeedback is true, and still at 14.9 seconds', () => {
    const {queryByText} = renderPleaseWait({showFeedback: true})

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(queryByText('Gegevens worden geladen')).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(9999)
    })

    expect(queryByText('Gegevens worden geladen')).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(queryByText('Gegevens worden geladen')).not.toBeTruthy()
    expect(
      queryByText('Dit duurt langer dan normaal. \nWe zijn nog bezig.'),
    ).toBeTruthy()
  })

  it('shows the second feedback message after fifteen seconds when startedTimeStamp is valid, and infinitely beyond that', () => {
    const {queryByText} = renderPleaseWait({startedTimeStamp: Date.now()})

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(
      queryByText('Dit duurt langer dan normaal. \nWe zijn nog bezig.'),
    ).not.toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(10000)
    })

    expect(
      queryByText('Dit duurt langer dan normaal. \nWe zijn nog bezig.'),
    ).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(60000)
    })

    expect(
      queryByText('Dit duurt langer dan normaal. \nWe zijn nog bezig.'),
    ).toBeTruthy()
  })
})
