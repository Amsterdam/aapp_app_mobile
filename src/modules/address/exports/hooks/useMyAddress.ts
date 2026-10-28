import {useSelector} from '@/hooks/redux/useSelector'
import {selectMyAddress} from '@/modules/address/slice'

export const useMyAddress = () => useSelector(selectMyAddress)
