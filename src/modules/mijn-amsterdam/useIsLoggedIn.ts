import {useSelector} from '@/hooks/redux/useSelector'
import {useGetMijnAmsterdamLoginStatusQuery} from '@/modules/mijn-amsterdam/service'
import {selectIsLoggedIn} from '@/modules/mijn-amsterdam/slice'

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useGetMijnAmsterdamLoginStatusQuery()

  return isLoggedIn
}
