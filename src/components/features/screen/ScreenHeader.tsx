import {Header} from '@/components/features/header/Header'
import {HeaderProps} from '@/components/features/header/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'

type Props = Pick<HeaderProps, 'options'>

export const ScreenHeader = ({options}: Props) => {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <Header
      back={{}}
      navigation={navigation}
      options={options}
      route={route}
    />
  )
}
