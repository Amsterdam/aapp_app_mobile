import {render} from '@testing-library/react-native'
import {MoreInfoButton} from '@/components/ui/buttons/MoreInfoButton'
import {StoreProvider} from '@/providers/store.provider'

it('MoreInfoButton renders correctly', () => {
  const {getByText} = render(
    <StoreProvider>
      <MoreInfoButton
        testID="MoreInfoButton"
        text="Meer informatie"
      />
    </StoreProvider>,
  )

  expect(getByText('Meer informatie')).toBeTruthy()
})
