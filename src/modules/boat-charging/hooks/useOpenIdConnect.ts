import {useSelector} from '@/hooks/redux/useSelector'
import {useBoatChargingOpenIdConnectConfigQuery} from '@/modules/boat-charging/service'
import {selectBoatChargingOpenIdConnectConfig} from '@/modules/boat-charging/slice'

export const useOpenIdConnect = () => {
  const {isLoading, isError} = useBoatChargingOpenIdConnectConfigQuery()
  const openIdConnectConfig = useSelector(selectBoatChargingOpenIdConnectConfig)

  return {
    openIdConnectConfig,
    isLoading: isLoading && !openIdConnectConfig,
    isError: isError && !openIdConnectConfig,
    isReady: !!openIdConnectConfig,
  }
}
