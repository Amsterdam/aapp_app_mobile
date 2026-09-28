import {render} from '@testing-library/react-native'
import {EmailButton} from '@/components/ui/buttons/EmailButton'
import {StoreProvider} from '@/providers/store.provider'

it('EmailButton renders correctly', () => {
  const {getByTestId} = render(
    <StoreProvider>
      <EmailButton
        email="test"
        testID="EmailButton"
      />
    </StoreProvider>,
  )

  expect(getByTestId('EmailButton')).toBeTruthy()
})
