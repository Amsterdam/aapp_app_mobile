import {Header} from '@/components/features/header/Header'
import {HeaderProps} from '@/components/features/header/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useTheme} from '@/themes/useTheme'

type Props = Pick<HeaderProps, 'options'>

export const ScreenHeader = ({options}: Props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const theme = useTheme()

  return (
    <Header
      back={{}}
      backgroundColor={theme.color.screen.background.default}
      navigation={navigation}
      options={options}
      route={route}
    />
  )
}
