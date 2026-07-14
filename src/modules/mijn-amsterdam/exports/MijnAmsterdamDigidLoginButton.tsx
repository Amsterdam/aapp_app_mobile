import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import {View} from 'react-native'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {Column} from '@/components/ui/layout/Column'
import {useGetMijnAmsterdamThemesQuery} from '@/modules/mijn-amsterdam/service'

export const MijnAmsterdamDigidLoginButton = () => {
  const [shouldLogin, setShouldLogin] = useState(false)

  const {isLoading} = useGetMijnAmsterdamThemesQuery(
    shouldLogin ? undefined : skipToken,
  )

  return (
    <Column gutter="md">
      <View />
      <DigiDButton
        isLoading={isLoading}
        onPress={() => setShouldLogin(true)}
        testID="MijnAmsterdamDigidLoginButton"
      />
    </Column>
  )
}
