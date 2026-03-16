import {useSelector} from '@/hooks/redux/useSelector'
import {useGetMijnAmsterdamLoginStatusQuery} from '@/modules/mijn-amsterdam/service'
import {
  selectIsLoggedIn,
  selectProfileName,
} from '@/modules/mijn-amsterdam/slice'

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const profileName = useSelector(selectProfileName)

  const {isLoading, refetch} = useGetMijnAmsterdamLoginStatusQuery()

  return {isLoggedIn, isLoading, profileName, refetch}
}
