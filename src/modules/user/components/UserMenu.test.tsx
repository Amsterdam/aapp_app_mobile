import {render} from '@testing-library/react-native'
import {UserMenu} from '@/modules/user/components/UserMenu'
import {StoreProvider} from '@/providers/store.provider'

let mockAccessCode = '1234'
let mockIsBiometricsSupported = true
let mockIsEnrolled = true
let mockBiometricsLabel = 'Face ID'

const mockNavigate = jest.fn()

jest.mock('@/hooks/navigation/useNavigation', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

jest.mock('@/modules/access-code/hooks/useGetSecureAccessCode', () => ({
  useGetSecureAccessCode: () => ({
    accessCode: mockAccessCode,
    isLoading: false,
  }),
}))

jest.mock('@/modules/access-code/hooks/useAccessCodeBiometrics', () => ({
  useAccessCodeBiometrics: () => ({
    biometricsLabel: mockBiometricsLabel,
    isBiometricsSupported: mockIsBiometricsSupported,
    isEnrolled: mockIsEnrolled,
  }),
}))

jest.mock('@/modules/user/components/AppInfoCopyButtons', () => ({
  AppInfoCopyButtons: () => null,
}))

describe('UserMenu - Security user menu items', () => {
  beforeEach(() => {
    mockAccessCode = '1234'
    mockIsBiometricsSupported = true
    mockIsEnrolled = true
    mockBiometricsLabel = 'Face ID'
    mockNavigate.mockClear()
  })

  it('shows the biometrics navigation item when biometrics are supported but not enrolled', () => {
    mockIsEnrolled = false

    const {getByText} = render(
      <StoreProvider>
        <UserMenu />
      </StoreProvider>,
    )

    expect(getByText('Toegang met Face ID')).toBeTruthy()
    expect(getByText('Wijzig toegangscode')).toBeTruthy()
  })

  it('hides the biometrics navigation item when biometrics are not supported', () => {
    mockIsBiometricsSupported = false

    const {getByText, queryByText} = render(
      <StoreProvider>
        <UserMenu />
      </StoreProvider>,
    )

    expect(getByText('Wijzig toegangscode')).toBeTruthy()
    expect(queryByText('Toegang met Face ID')).toBeNull()
  })

  it('does not show security menu items when access code is not set', () => {
    mockAccessCode = ''

    const {queryByText} = render(
      <StoreProvider>
        <UserMenu />
      </StoreProvider>,
    )

    expect(queryByText('Wijzig toegangscode')).toBeNull()
    expect(queryByText('Toegang met Face ID')).toBeNull()
  })

  it('shows the biometrics label in the menu item as returned by the useAccessCodeBiometrics hook', () => {
    mockBiometricsLabel = 'Test'

    const {getByText} = render(
      <StoreProvider>
        <UserMenu />
      </StoreProvider>,
    )

    expect(getByText('Toegang met Test')).toBeTruthy()
  })
})
