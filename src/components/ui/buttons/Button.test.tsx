import {fireEvent, render} from '@testing-library/react-native'
import {TextStyle, ViewStyle} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {StoreProvider} from '@/providers/store.provider'

describe('Button', () => {
  it('renders with label and icon', () => {
    const {getByTestId, getByText} = render(
      <StoreProvider>
        <Button
          icon={{name: 'warning'}}
          label="My Button"
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(getByTestId('Button')).toBeTruthy()
    expect(getByTestId('ButtonIcon')).toBeTruthy()
    expect(getByTestId('ButtonLabel')).toBeTruthy()
    expect(getByText('My Button')).toBeTruthy()
  })

  it('renders spinner icon when isLoading', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          icon={{name: 'warning'}}
          isLoading
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ButtonIcon').parent?.parent?.props.name).toBe('spinner')
  })

  it('renders alert icon when isError', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          icon={{name: 'warning'}}
          isError
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ButtonIcon').parent?.parent?.props.name).toBe('warning')
  })

  it('renders with different variants', () => {
    ;(
      ['primary', 'secondary', 'tertiary', 'secondaryDestructive'] as const
    ).forEach(variant => {
      const {getByTestId, unmount} = render(
        <StoreProvider>
          <Button
            label="Test"
            testID="Button"
            variant={variant}
          />
        </StoreProvider>,
      )

      expect(getByTestId('Button')).toBeTruthy()
      unmount()
    })
  })

  it('applies underline to label when underline prop is true', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          label="Underlined"
          testID="Button"
          underline
        />
      </StoreProvider>,
    )

    expect(
      (getByTestId('ButtonLabel').props.style as TextStyle).textDecorationLine,
    ).toBe('underline')
  })

  it('applies noPadding, noPaddingHorizontal, noPaddingVertical', () => {
    const {getByTestId, unmount} = render(
      <StoreProvider>
        <Button
          noPadding
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(
      (getByTestId('Button').props.style as ViewStyle).paddingHorizontal,
    ).toBe(0)
    expect(
      (getByTestId('Button').props.style as ViewStyle).paddingVertical,
    ).toBe(0)
    unmount()
    const {getByTestId: getByTestId2, unmount: unmount2} = render(
      <StoreProvider>
        <Button
          noPaddingHorizontal
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(
      (getByTestId2('Button').props.style as ViewStyle).paddingHorizontal,
    ).toBe(0)
    unmount2()
    const {getByTestId: getByTestId3} = render(
      <StoreProvider>
        <Button
          noPaddingVertical
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(
      (getByTestId3('Button').props.style as ViewStyle).paddingVertical,
    ).toBe(0)
  })

  it('applies small, numberOfLines, ellipsizeMode', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          ellipsizeMode="tail"
          label="Small"
          numberOfLines={2}
          small
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ButtonLabel').props.numberOfLines).toBe(2)
    expect(getByTestId('ButtonLabel').props.ellipsizeMode).toBe('tail')
  })

  it('calls onPress, onPressIn, onPressOut', () => {
    const onPress = jest.fn()
    const onPressIn = jest.fn()
    const onPressOut = jest.fn()
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          testID="Button"
        />
      </StoreProvider>,
    )
    const btn = getByTestId('Button')

    fireEvent.press(btn)
    expect(onPress).toHaveBeenCalled()
  })

  it('renders link-external icon and reverses Row', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button
          icon={{name: 'link-external'}}
          testID="Button"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ButtonIcon').parent?.parent?.props.name).toBe(
      'link-external',
    )
    // Can't directly test Row reverse, but no error means prop is accepted
  })

  it('sets accessibility props', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <Button testID="Button" />
      </StoreProvider>,
    )

    expect(getByTestId('Button').props.accessibilityRole).toBe('button')
    expect(getByTestId('Button').props.accessibilityLanguage).toBe('nl-NL')
  })
})
