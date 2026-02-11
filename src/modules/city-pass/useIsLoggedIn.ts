import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'

export const useIsLoggedIn = () => useSelector(selectIsCityPassOwnerRegistered)
