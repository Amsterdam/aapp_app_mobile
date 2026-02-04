import {render} from '@testing-library/react-native'
import {MoreInfoButton} from '@/components/ui/buttons/MoreInfoButton'
import {StoreProvider} from '@/providers/store.provider'

it('MoreInfoButton renders correctly', () => {
  render(
    <StoreProvider>
      <MoreInfoButton
        testID="MoreInfoButton"
        text="Meer informatie"
      />
    </StoreProvider>,
  )
})
