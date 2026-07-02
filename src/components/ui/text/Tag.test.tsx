import {render} from '@testing-library/react-native'
import {Tag} from '@/components/ui/text/Tag'
import {StoreProvider} from '@/providers/store.provider'

it('Tag renders correctly', () => {
  render(
    <StoreProvider>
      <Tag
        label="Label"
        testID="Tag"
      />
    </StoreProvider>,
  )
})
