import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {SportsCategoryList} from '@/modules/sport/components/SportsCategoryList'
import {SportRouteName} from '@/modules/sport/routes'

type Props = NavigationProps<SportRouteName.sportCategory>

export const SportItemScreen = ({route}: Props) => {
  useSetScreenTitle(route.params.title)

  return (
    <Screen testID="SportItemScreen">
      <SportsCategoryList />
    </Screen>
  )
}
