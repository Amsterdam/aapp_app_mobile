import {Text} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

export const MijnAmsterdamDashboardScreen = () => {
  const {item: mijnAmsterdamAccessToken, isLoading} = useGetSecureItem(
    SecureItemKey.mijnAmsterdamAccessToken,
  )

  return (
    <Screen
      hasStickyAlert
      scroll={false}
      testID="MijnAmsterdamDashboardScreen">
      <Text>
        {isLoading
          ? 'Laden...'
          : (mijnAmsterdamAccessToken ?? 'Nog niet ingelogd')}
      </Text>
    </Screen>
  )
}
