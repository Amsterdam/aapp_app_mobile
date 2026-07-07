import {
  NavigationProvider,
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native'
import {fireEvent, render} from '@testing-library/react-native'
import {ContentButton} from '@/components/ui/buttons/ContentButton'
import {Tag} from '@/components/ui/text/Tag'
import {StoreProvider} from '@/providers/store.provider'

describe('ContentButton', () => {
  it('renders with title and icon', () => {
    const {getByTestId, getByText} = render(
      <StoreProvider>
        <ContentButton
          icon={{name: 'asterisk'}}
          meta="My meta"
          onPress={() => null}
          testID="ContentButton"
          title="My ContentButton"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ContentButton')).toBeTruthy()
    expect(getByTestId('ContentButtonIcon')).toBeTruthy()
    expect(getByTestId('ContentButtonTitle')).toBeTruthy()
    expect(getByText('My ContentButton')).toBeTruthy()
    expect(getByText('My meta')).toBeTruthy()
    expect(getByTestId('ContentButtonIcon').parent?.parent?.props.name).toBe(
      'asterisk',
    )
  })
  it('renders with tag and hides meta', () => {
    const {getByTestId, getByText, queryByText} = render(
      <StoreProvider>
        <ContentButton
          icon={{name: 'asterisk'}}
          meta="My meta"
          onPress={() => null}
          tag={
            <Tag
              label="Nieuw"
              testID="ContentButtonTag"
            />
          }
          testID="ContentButton"
          title="My ContentButton"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ContentButton')).toBeTruthy()
    expect(getByTestId('ContentButtonIcon')).toBeTruthy()
    expect(getByTestId('ContentButtonTitle')).toBeTruthy()
    expect(getByText('My ContentButton')).toBeTruthy()
    expect(queryByText('My meta')).toBeNull()
    expect(getByTestId('ContentButtonIcon').parent?.parent?.props.name).toBe(
      'asterisk',
    )
  })

  it('renders with images', () => {
    const {getByTestId, getByText} = render(
      <NavigationProvider
        navigation={{} as NavigationProp<ParamListBase>}
        route={{key: 'test', name: 'Test'}}>
        <StoreProvider>
          <ContentButton
            images={[
              {uri: 'https://example.com/image.jpg', width: 100, height: 100},
            ]}
            meta="My meta"
            onPress={() => null}
            testID="ContentButton"
            title="My ContentButton"
          />
        </StoreProvider>
      </NavigationProvider>,
    )

    expect(getByTestId('ContentButton')).toBeTruthy()
    expect(getByTestId('ContentButtonTitle')).toBeTruthy()
    expect(
      getByTestId('ContentButtonImage', {includeHiddenElements: true}),
    ).toBeTruthy()
    expect(getByText('My ContentButton')).toBeTruthy()
    expect(getByText('My meta')).toBeTruthy()
  })

  it('calls onPress, onPressIn, onPressOut', () => {
    const onPress = jest.fn()
    const {getByTestId} = render(
      <StoreProvider>
        <ContentButton
          icon={{name: 'asterisk'}}
          onPress={onPress}
          testID="ContentButton"
          title="My ContentButton"
        />
      </StoreProvider>,
    )
    const btn = getByTestId('ContentButton')

    fireEvent.press(btn)
    expect(onPress).toHaveBeenCalled()
  })

  it('sets accessibility props', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <ContentButton
          icon={{name: 'asterisk'}}
          onPress={() => null}
          testID="ContentButton"
          title="My ContentButton"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ContentButton').props.accessibilityRole).toBe('button')
    expect(getByTestId('ContentButton').props.accessibilityLanguage).toBe(
      'nl-NL',
    )
  })

  it('derives an accessibility title from its visible title', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <ContentButton
          icon={{name: 'asterisk'}}
          onPress={() => null}
          testID="ContentButton"
          title="12345"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ContentButton').props.accessibilityLabel).toBe(
      '1, 2, 3, 4, 5',
    )
  })

  it('normalizes an explicit accessibility title', () => {
    const {getByTestId} = render(
      <StoreProvider>
        <ContentButton
          accessibilityLabel="t/m 12345"
          icon={{name: 'asterisk'}}
          onPress={() => null}
          testID="ContentButton"
          title="My ContentButton"
        />
      </StoreProvider>,
    )

    expect(getByTestId('ContentButton').props.accessibilityLabel).toBe(
      'tot en met 1, 2, 3, 4, 5',
    )
  })
})
